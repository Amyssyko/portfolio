import type { APIRoute } from 'astro'

export const GET: APIRoute = ({ site }) => {
	const port = process.env.PORT || 4321
	const siteUrl = site?.origin ?? `http://localhost:${port}`

	return new Response(
		`User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap-index.xml
`,
		{
			headers: {
				'Content-Type': 'text/plain; charset=utf-8'
			}
		}
	)
}
