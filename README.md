# Matriz de Consecuencias — App (PWA) · OXXO Chile

Guía de gestión de consecuencias para Asesores de Tienda, en formato de **app instalable**
que funciona **100% offline**, **gratis**, en **Android y iPhone**, **sin depender de Claude**
ni de ninguna cuenta o servicio de pago.

---

## 1. Qué contiene este paquete

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La app en sí (buscador, categorías, fichas). Es el corazón de todo. |
| `manifest.json` | Le da nombre, ícono y color para que el celular la trate como una app. |
| `service-worker.js` | Guarda todo en el teléfono para que funcione **sin internet**. |
| `icons/icon-192.png` | Ícono pantalla de inicio (Android). |
| `icons/icon-512.png` | Ícono grande / splash. |
| `icons/icon-maskable-512.png` | Ícono adaptable de Android (se recorta a la forma del sistema). |
| `icons/apple-touch-icon.png` | Ícono en iPhone. |
| `icons/logo.png` | Logo OXXO usado en el encabezado de la app. |
| `README.md` | Este documento. |

> **Importante:** sube **todos** los archivos respetando la carpeta `icons/`.
> Si los íconos no quedan dentro de una carpeta llamada `icons`, no se verán.

---

## 2. Publicarla gratis en GitHub Pages (una sola vez)

GitHub Pages es un hosting gratuito de GitHub. Te entrega un link `https://...`
que es el que vas a repartir a los asesores. **La instalación y el modo offline
solo funcionan sobre `https://`**, por eso necesitamos publicarla (abrir el archivo
suelto desde el celular NO sirve).

### Paso 1 — Crear una cuenta de GitHub (si no tienes)
1. Entra a https://github.com → **Sign up**.
2. Usa un correo (idealmente uno corporativo o uno de equipo, no personal, para que no se pierda).
3. Confirma el correo. Es gratis.

### Paso 2 — Crear el repositorio
1. Arriba a la derecha, clic en **+** → **New repository**.
2. **Repository name:** `matriz-consecuencias` (o el nombre que quieras).
3. Marca **Public** (necesario para que GitHub Pages sea gratis).
4. Clic en **Create repository**.

### Paso 3 — Subir los archivos
1. En la página del repositorio recién creado, clic en **Add file** → **Upload files**.
2. Arrastra **todos** los archivos de este paquete.
   - Para mantener la carpeta `icons/`: arrastra la **carpeta `icons` completa**, no los íconos sueltos.
3. Abajo, clic en **Commit changes**.

### Paso 4 — Activar GitHub Pages
1. En el repositorio, ve a **Settings** (arriba) → en el menú izquierdo, **Pages**.
2. En **Source**, elige **Deploy from a branch**.
3. En **Branch**, selecciona `main` y carpeta `/ (root)` → **Save**.
4. Espera 1–2 minutos. Recarga la página de **Pages**.

### Paso 5 — Obtener tu link
Arriba aparecerá algo como:
```
https://TU-USUARIO.github.io/matriz-consecuencias/
```
**Ese es el link que repartes.** Cópialo y pruébalo en tu propio celular antes de difundirlo.

> Tip: puedes generar un **código QR** gratis de ese link (busca "QR code generator")
> y pegarlo en un afiche para que los asesores lo escaneen.

---

## 3. Cómo la instala un asesor (sin GitHub, sin tienda de apps)

Solo necesitan el link. No descargan nada de App Store ni Google Play.

### En Android (con Chrome)
1. Abrir el link en **Chrome**.
2. Tocar el menú **⋮** (arriba a la derecha).
3. Tocar **Instalar app** o **Agregar a pantalla principal**.
4. Confirmar. Queda el ícono naranjo en la pantalla de inicio.

### En iPhone (con Safari)
1. Abrir el link en **Safari** (no en Chrome; en iPhone solo Safari permite instalar).
2. Tocar el botón **Compartir** (el cuadrado con la flecha hacia arriba).
3. Bajar y tocar **Agregar a pantalla de inicio**.
4. Tocar **Agregar**. Queda el ícono, sin barra de navegador.

Después de instalada, **funciona sin internet**. La primera vez sí necesita señal
(para descargarse); de ahí en adelante abre offline.

---

## 4. Cómo publicar una actualización (cuando cambie la matriz)

Cuando ajustes los escenarios o cualquier contenido, harás esto:

1. Reemplaza el `index.html` (y/o lo que haya cambiado) en el repositorio:
   **Add file → Upload files →** sube el nuevo → **Commit changes**.
2. **MUY IMPORTANTE:** abre `service-worker.js` en GitHub, clic en el lápiz ✏️ para editar,
   y **sube el número de versión** en esta línea:
   ```js
   const CACHE = "matriz-consecuencias-v2-1";   // cámbialo a v2-2, luego v2-3, etc.
   ```
   Guarda con **Commit changes**.

Ese cambio de número es lo que avisa a los celulares ya instalados que hay una versión
nueva. La próxima vez que el asesor abra la app **con internet**, se actualiza sola.
**No tienen que reinstalar nada.**

> Si subes contenido nuevo pero NO cambias el número de versión, los celulares
> seguirán mostrando la versión vieja (porque la tienen guardada). Por eso el número
> de versión es obligatorio en cada actualización.

También conviene actualizar el rótulo visible de versión dentro del `index.html`
(busca `v2.1 · jun 2026` y cámbialo), para que el asesor vea qué versión tiene.

---

## 5. Privacidad y datos

- La app **no envía datos a ningún servidor**. Todo ocurre dentro del teléfono.
- El historial de consultas (si se activa) se guarda **solo en el dispositivo del asesor**.
  Nadie más lo ve, ni OXXO ni terceros.
- No requiere login ni recopila información personal.

---

## 6. Recordatorio legal

La app es una **guía de apoyo**, no una resolución automática. La gravedad real y la
decisión final **siempre las define una persona responsable**, considerando el contexto,
el debido proceso y los plazos (perdón de la causa). Los umbrales de monto y las
consecuencias deben mantenerse alineados con la matriz vigente validada por Compliance/RR.LL.

---

*Versión del paquete: v2.2 · junio 2026 · Dataset: borrador para validación.*
