# Orion Inmobiliaria — Prueba técnica OrionAIoT

Web de inmobiliaria con autenticación propia (registro + login con JWT), un mapa de
proyectos con marcadores editables y una tabla de estadísticas de venta.

## Requisitos

- **Node.js 20 o superior** y **npm** (verifica con `node -v`).
- Puertos **4000** (API) y **5173** (web) libres en tu máquina.

## Cómo levantarlo (un solo comando)

Desde la raíz del proyecto:

```bash
npm run start
```

Esto instala las dependencias de la raíz, `server/` y `client/`, y arranca ambos
servicios en paralelo: la API en `http://localhost:4000` y la web en
`http://localhost:5173`. La primera vez tarda un poco más por la instalación;
las siguientes veces basta con `npm run dev`.

Abre `http://localhost:5173`, regístrate con cualquier correo/contraseña (mínimo 6
caracteres) y explora los menús **Compra → Proyectos** y **Venta → Estadísticas**.

<details>
<summary>Levantar cada parte por separado (opcional)</summary>

```bash
# Backend
cd server && npm install && npm run dev

# Frontend
cd client && npm install && npm run dev
```

</details>

## Stack

- **Backend**: Node + Express, JWT (`jsonwebtoken` + `bcryptjs`), datos en memoria (sin BD).
- **Frontend**: React + TypeScript (Vite), Material UI (Material Design), React Router
  con `React.lazy` por ruta, y [mapcn](https://www.mapcn.dev) (MapLibre) para el mapa.
- **Variables de entorno**: `.env.development` / `.env.production` en `server/` y `client/`.

## Estructura

```
server/   API Express (auth, marcadores, estadísticas)
client/   SPA React (login/registro, header con menús, mapa, tabla)
```

## Notas

- No se usa base de datos: usuarios y marcadores viven en memoria y se reinician con
  el servidor, tal como permite el enunciado.
- Para producción, ajusta `server/.env.production` (`JWT_SECRET`, `CORS_ORIGIN`) y
  `client/.env.production` (`VITE_API_URL`) antes de compilar (`npm run build` en `client/`).
