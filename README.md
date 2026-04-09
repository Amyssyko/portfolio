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

| Comando                          | Descripción                                     |
| :------------------------------- | :---------------------------------------------- |
| `bun install`                    | Instala dependencias                            |
| `bun run dev`                    | Inicia entorno local                            |
| `bun run build`                  | Ejecuta `astro check` y build de producción     |
| `bun run preview`                | Previsualiza el build local                     |
| `bun run lint`                   | Revisión de tipos/diagnóstico con Astro         |
| `bun run test`                   | Prueba base para CI (placeholder)               |
| `bun run format`                 | Formatea código con Prettier                    |
| `bun run security:check-config`  | Valida hardening de Bun y dependencias fijadas  |
| `bun run security:audit`         | Auditoría de vulnerabilidades con Bun audit     |
| `bun run security:enforce-audit` | Aplica política fase 3 (bun/npm audit + gracia) |

## Seguridad supply chain (Bun)

Este repositorio aplica un baseline de hardening para cadena de suministro usando **Bun**:

- `bunfig.toml` fuerza instalación reproducible (`install.exact=true`) y usa `install.linker="hoisted"` por compatibilidad con Astro/Vite en este proyecto.
- Lockfile de Bun obligatorio (`bun.lockb` o `bun.lock`) y validado en CI.
- Instalación en CI siempre congelada: `bun install --frozen-lockfile`.
- Guardrail custom (`scripts/security/check-bun-hardening.mjs`) que bloquea:
  - `packageManager` distinto de Bun,
  - falta de scripts mínimos de CI,
  - versiones no fijadas (`^`, `~`, `latest`, etc.),
  - configuración insegura en `bunfig.toml`.

### Equivalencia con políticas de pnpm (controles compensatorios)

Si Bun no ofrece equivalente 1:1 para políticas avanzadas (ej. `minimumReleaseAge`, `allowBuilds`, `trustPolicy`), se aplican controles compensatorios en CI:

- auditoría de dependencias con `bun audit` + fallback `npm audit`,
- escaneo de vulnerabilidades con OSV Scanner sobre SBOM (CycloneDX),
- control explícito de configuración y lockfile mediante script de hardening.

## Workflows de seguridad y calidad

En `.github/workflows/`:

- `ci-security.yml`: push/PR a `main`, setup Bun, install congelado, guardrails, lint, build y test.
- `codeql.yml`: análisis SAST de JavaScript/TypeScript con CodeQL.
- `deps-security.yml`: `bun audit`, fallback `npm audit`, SBOM + OSV Scanner.
- `secret-scan.yml`: detección de secretos con Gitleaks.

### Fase 2: bloqueo gradual por severidad (OSV)

`deps-security.yml` ahora incluye enforcement de política sobre el resultado JSON de OSV:

- En `pull_request`: modo **reporte** (no bloqueante) para facilitar remediación incremental.
- En `push`/`schedule` sobre `main`: modo **bloqueante** para severidad `HIGH` y `CRITICAL`.

La política se evalúa con `scripts/security/enforce-osv-policy.mjs` y excepciones temporales en:

- `security/osv-exceptions.json`

Formato de excepción (requiere `id`, `reason`, `expiresOn`; `package` opcional):

```json
{
	"id": "GHSA-xxxx-xxxx-xxxx",
	"package": "nombre-paquete-opcional",
	"reason": "Justificación con ticket interno",
	"expiresOn": "2026-06-30"
}
```

> Recomendación: usar expiraciones cortas y rotar excepciones semanalmente.

### Fase 3: gating de bun/npm audit con ventana de gracia

`deps-security.yml` también aplica política sobre reportes de `bun audit` y `npm audit`:

- `bun audit` se captura en `bun-audit.txt`.
- `npm audit --json` se captura en `npm-audit.json`.
- El script `scripts/security/enforce-audit-policy.mjs` evalúa:
  - umbral de bloqueo (`HIGH` por defecto),
  - excepciones temporales,
  - ventana de gracia por CVE/GHSA.

Archivo de política:

- `security/audit-grace-policy.json`

Estructura recomendada:

```json
{
	"defaultThreshold": "HIGH",
	"defaultGraceDays": 14,
	"exceptions": [
		{
			"id": "GHSA-xxxx-xxxx-xxxx",
			"package": "nombre-paquete-opcional",
			"reason": "Justificación con ticket",
			"expiresOn": "2026-06-30"
		}
	],
	"graceWindow": [
		{
			"id": "CVE-2026-1234",
			"package": "nombre-paquete-opcional",
			"detectedOn": "2026-04-08",
			"graceDays": 14,
			"reason": "Pendiente de parche compatible"
		}
	]
}
```

Modo de operación:

- En `pull_request`: modo reporte (no bloqueante).
- En `push`/`schedule` a `main`: modo bloqueante.

## Excepciones de seguridad

- **Dependencias con scripts de build**: usar `trustedDependencies` en `package.json`.
- **Falsos positivos de vulnerabilidades**: documentar ticket de riesgo y agregar excepción temporal en la configuración correspondiente del escáner (con fecha de expiración y responsable).
- **Nunca** desactivar globalmente los checks de CI en `main`.

## Ejecutar localmente los checks de CI

1. Instalar dependencias de forma reproducible:
   - `bun install --frozen-lockfile`
2. Validar hardening:
   - `bun run security:check-config`
3. Ejecutar calidad y build:
   - `bun run lint`
   - `bun run build`
   - `bun run test`
4. Auditoría de dependencias:
   - `bun run security:audit`
   - `bun audit > bun-audit.txt || true`
   - `npm audit --omit=dev --json > npm-audit.json || true`
   - `bun run security:enforce-audit -- --bun-report bun-audit.txt --npm-report npm-audit.json --policy security/audit-grace-policy.json`
   - `bun run security:enforce-osv -- --input osv-results.json --exceptions security/osv-exceptions.json`

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
