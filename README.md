# Portfolio · Astro 6 + React

Portfolio personal construido con **Astro 6**, componentes **React**, estilos con **Tailwind CSS v4** y enfoque en rendimiento/SEO.

## Stack

- Astro 6
- React 19
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Bun (package manager / runner)

## Estructura principal

```text
/
├── public/
│   ├── avatar-amyssyko-320.jpg
│   ├── favicon.svg
│   └── favicon-dark.svg
├── src/
│   ├── components/
│   ├── images/
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   └── robots.txt.ts
│   └── styles/
│       └── globals.css
├── astro.config.mjs
├── .env
└── package.json
```

## Variables de entorno

Este proyecto usa:

- `PUBLIC_SITE_URL` → URL pública del sitio (sin slash final).

Ejemplo:

```dotenv
PUBLIC_SITE_URL=https://tudominio.com
```

> En local puedes usar `http://localhost:3000`, pero para producción (Vercel) debes configurar el dominio real en el panel de variables.

## Scripts

Todos los comandos se ejecutan en la raíz del proyecto.

| Comando           | Descripción                                 |
| :---------------- | :------------------------------------------ |
| `bun install`     | Instala dependencias                        |
| `bun run dev`     | Inicia entorno local                        |
| `bun run build`   | Ejecuta `astro check` y build de producción |
| `bun run preview` | Previsualiza el build local                 |
| `bun run lint`    | Revisión de tipos/diagnóstico con Astro     |
| `bun run format`  | Formatea código con Prettier                |

## SEO implementado

- Canonical dinámico por ruta
- Open Graph y Twitter Cards
- JSON-LD (`Person` y `WebSite`)
- `robots.txt` dinámico en `src/pages/robots.txt.ts`
- Sitemap automático (`@astrojs/sitemap`)

## Despliegue en Vercel

1. Conecta el repositorio en Vercel.
2. Configura variable `PUBLIC_SITE_URL` para **Production** (y opcionalmente Preview).
3. Build command: `bun run build`
4. Output directory: `dist`

## Notas de rendimiento

- Imágenes optimizadas y redimensionadas para el tamaño real de render.
- Inicialización de tema inline para evitar request bloqueante adicional.
- Limpieza de assets obsoletos para reducir peso del repositorio.
