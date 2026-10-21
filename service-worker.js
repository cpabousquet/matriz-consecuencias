/* ============================================================
   Service Worker — Matriz de Consecuencias
   Estrategia:
   - data.json  → network-first (siempre intenta traer la matriz
                  más reciente; sin internet usa la última guardada).
   - resto      → cache-first (la app funciona 100% offline).
   - admin      → nunca se cachea (siempre va a la red).

   ⚠️ Los cambios de CONTENIDO (escenarios) ya NO requieren subir
   la versión: se publican desde admin.html cargando un Excel.
   Solo sube la versión (v3-0 → v3-1 ...) si cambias el diseño o
   el código de index.html / service-worker.js.
   ============================================================ */

const CACHE = "matriz-consecuencias-v3-0";
const DATA_KEY = "./data.json";

const ASSETS = [
  "./",
  "./index.html",
  "./data.json",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png",
];

// Instalar: precachear todo
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

// Activar: borrar cachés viejas de versiones anteriores
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;            // APIs externas: directo a la red
  if (/\/admin(\.html|-config\.json)?$/.test(url.pathname)) return;  // panel admin: nunca en caché

  // data.json: primero red (con cache-busting para saltar el CDN), si falla, caché
  if (url.pathname.endsWith("/data.json")) {
    e.respondWith(
      fetch(`${DATA_KEY}?t=${Date.now()}`, { cache: "no-store" })
        .then((res) => {
          if (!res.ok) throw new Error(res.status);
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(DATA_KEY, copy));
          return res;
        })
        .catch(() => caches.match(DATA_KEY))
    );
    return;
  }

  // Resto: primero caché, si no hay, red
  e.respondWith(
    caches.match(e.request).then((hit) => hit || fetch(e.request).catch(() => caches.match("./index.html")))
  );
});
