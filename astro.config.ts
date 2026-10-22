import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, memoryCache } from 'astro/config'
import { loadEnv } from 'vite'

const mode =
	process.env.NODE_ENV === 'production' ? 'production' : 'development'

const env = loadEnv(mode, process.cwd(), '')
const rawSite = env.PUBLIC_SITE_URL?.trim()

if (!rawSite && mode === 'production') {
	throw new Error('Falta PUBLIC_SITE_URL en el entorno de producción.')
}

let site

if (rawSite) {
	let parsed

	try {
		parsed = new URL(rawSite)
	} catch {
		throw new Error('PUBLIC_SITE_URL debe ser una URL válida.')
	}

	if (
		parsed.protocol !== 'https:' &&
		!(mode !== 'production' && parsed.protocol === 'http:')
	) {
		throw new Error('PUBLIC_SITE_URL debe utilizar HTTPS en producción.')
	}

	if (parsed.username || parsed.password || parsed.search || parsed.hash) {
		throw new Error(
			'PUBLIC_SITE_URL no debe incluir credenciales, parámetros ni fragmentos.'
		)
	}

	site = parsed.origin
}

export default defineConfig({
	site,
	devToolbar: {
		enabled: false
	},
	vite: {
		plugins: [tailwindcss()]
	},
	cache: {
		provider: memoryCache({ max: 500 })
	},
	integrations: [sitemap(), react()]
})
