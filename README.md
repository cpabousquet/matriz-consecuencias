# Matriz de Consecuencias — App (PWA) · OXXO Chile

Guía de gestión de consecuencias para Asesores de Tienda, en formato de **app instalable**
que funciona **offline**, **gratis**, en **Android y iPhone**, sin servidores ni servicios de pago.

Desde la v3 la matriz **se actualiza cargando un Excel** en un panel de administrador protegido
con contraseña. El resto de los usuarios solo visualiza.

---

## 1. Qué contiene

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La app (buscador, categorías, fichas, combinar faltas). Lee los escenarios desde `data.json`. |
| `data.json` | **La matriz.** Se genera sola desde el panel admin; no se edita a mano. |
| `admin.html` | Panel de administrador: ingreso con contraseña, carga de Excel, validación y publicación. |
| `admin-config.json` | Token de GitHub **cifrado** con la contraseña de admin (se crea en la configuración inicial). |
| `plantilla-matriz.xlsx` | Excel con la matriz inicial, para usar de plantilla. |
| `service-worker.js` | Guarda la app en el teléfono para que funcione sin internet. |
| `manifest.json` + `*.png` | Nombre, colores e íconos de la app instalable. |

## 2. Cómo funciona

```
Admin ──(contraseña)──► admin.html ──(Excel validado)──► GitHub API ──► data.json en el repo
                                                                            │
Asesores ◄── index.html lee data.json (con internet: lo último; sin internet: la última copia guardada)
```

- GitHub Pages solo sirve archivos; no tiene base de datos. Por eso el panel publica `data.json`
  directamente en el repositorio usando la API de GitHub.
- Para escribir en el repo se necesita un **token de GitHub**. Ese token se guarda en
  `admin-config.json` **cifrado** (AES-256-GCM, clave derivada con PBKDF2-SHA256 de 600.000 iteraciones).
  Sin la contraseña no se puede descifrar. El token nunca aparece en texto plano en el repo.
- Cada publicación queda como un commit: **todas las versiones anteriores quedan en el historial**
  de GitHub y se pueden recuperar.

## 3. Publicar en GitHub Pages (una sola vez)

1. Crea un repositorio **público** y sube todos los archivos de esta carpeta.
2. **Settings → Pages → Source:** *Deploy from a branch*, rama `main`, carpeta `/ (root)` → **Save**.
3. En 1–2 minutos tendrás el link `https://TU-USUARIO.github.io/NOMBRE-REPO/`. Ese es el link para los asesores.

## 4. Configuración inicial del administrador (una sola vez)

1. **Crea un token** en GitHub → Settings → Developer settings → *Fine-grained personal access tokens* → **Generate new token**:
   - *Repository access:* **Only select repositories** → elige solo este repositorio.
   - *Permissions → Repository → Contents:* **Read and write**. Nada más.
   - Expiración: la máxima que permita tu cuenta. Anota la fecha: cuando expire, lo renuevas (paso 6).
2. Abre `https://TU-USUARIO.github.io/NOMBRE-REPO/admin.html`.
3. Como aún no hay configuración, verás **Configuración inicial**: pega el token, revisa usuario/repositorio
   (se completan solos), define la **contraseña de administrador** (mínimo 12 caracteres; mejor una frase larga) y guarda.

Listo: desde ahora `admin.html` pide la contraseña.

## 5. Actualizar la matriz (cada vez que cambie)

1. Entra a `admin.html` con la contraseña.
2. **Descargar Excel actual** → edítalo en Excel (hoja *Matriz*, sin cambiar los títulos).
   - Obligatorias: *Categoría, Escenario, Gravedad, Consecuencia recomendada*.
   - *Gravedad*: Baja, Media, Alta o Crítica.
   - *Escenario* no se puede repetir.
   - *Palabras clave*: lo que la gente escribiría en el buscador.
3. **Carga el Excel.** El panel muestra errores por fila (y no deja publicar si los hay) y un resumen:
   nuevos / modificados / eliminados.
4. Escribe tu nombre y toca **Publicar en la app**.
5. En 1–2 minutos la app muestra la nueva versión. Los teléfonos la reciben al abrir la app con internet;
   **no hay que reinstalar ni tocar el `service-worker.js`**.

## 6. Cambiar la contraseña o renovar el token

En el panel → **Cambiar contraseña / token**. Si el token expiró, crea uno nuevo (paso 4.1) y pégalo ahí.
Si olvidas la contraseña: crea un token nuevo, borra `admin-config.json` del repositorio y repite la configuración inicial.

## 7. Cambios de diseño o código

Solo si modificas `index.html` o `service-worker.js` (no el contenido), sube la versión en `service-worker.js`:
```js
const CACHE = "matriz-consecuencias-v3-0";   // → v3-1, v3-2 ...
```

## 8. Seguridad, privacidad y límites

- La app **no envía datos de los asesores a ningún servidor** ni requiere login. Las consultas quedan en el teléfono.
- El repositorio es público: **la matriz (`data.json`) es visible para cualquiera** que conozca el link,
  igual que la app. No pongas datos personales ni casos reales en el Excel.
- La protección del panel depende de la **fortaleza de la contraseña**: el archivo cifrado es público,
  así que una contraseña corta podría adivinarse por fuerza bruta. Usa una frase larga y no la reutilices.
- El token solo puede tocar el contenido de este repositorio (nada más de tu cuenta de GitHub).

## 9. Recordatorio legal

La app es una **guía de apoyo**, no una resolución automática. La gravedad real y la decisión final
**siempre las define una persona responsable**, considerando el contexto, el debido proceso y los plazos
(perdón de la causa). Los umbrales de monto y las consecuencias deben mantenerse alineados con la matriz
vigente validada por Compliance/RR.LL.

---

*Versión del paquete: v3.0 · octubre 2026.*
