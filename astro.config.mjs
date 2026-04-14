import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import { loadEnv } from 'vite'

import react from '@astrojs/react'

const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '')

// https://astro.build/config
export default defineConfig({
	site: env.PUBLIC_SITE_URL,
	devToolbar: {
		enabled: false
	},
	vite: {
		plugins: [tailwindcss()]
	},
	integrations: [sitemap(), react()]
})
