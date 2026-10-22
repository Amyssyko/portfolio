import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, memoryCache } from 'astro/config'
import { loadEnv } from 'vite'

const mode =
	process.env.NODE_ENV === 'production' ? 'production' : 'development'

const env = loadEnv(mode, process.cwd(), '')

const site = env.PUBLIC_SITE_URL?.trim()

if (!site && mode === 'production') {
	throw new Error('Falta PUBLIC_SITE_URL en el entorno de producción.')
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
