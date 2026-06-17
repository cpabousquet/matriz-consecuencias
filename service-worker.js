/* ============================================================
   Service Worker — Matriz de Consecuencias
   Estrategia: cache-first (la app funciona 100% offline).

   ⚠️ IMPORTANTE AL ACTUALIZAR:
   Cada vez que cambies el contenido (escenarios, textos, diseño),
   sube el número de versión de abajo (v2-1 → v2-2 → v2-3 ...).
   Eso es lo que hace que los celulares ya instalados refresquen
   automáticamente a la versión nueva la próxima vez que abran la
   app con internet.
   ============================================================ */

const CACHE = "matriz-consecuencias-v2-4";

const ASSETS = [
  "./",
  "./index.html",
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

// Responder: primero caché, si no hay, red
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then((hit) => hit || fetch(e.request).catch(() => caches.match("./index.html")))
  );
});
