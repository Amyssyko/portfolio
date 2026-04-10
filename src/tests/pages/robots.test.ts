import { describe, expect, it } from 'bun:test'
import { GET } from '../../pages/robots.txt'

describe('GET /robots.txt', () => {
	it('responde con contenido de texto plano', async () => {
		const response = await GET({} as any)

		expect(response.status).toBe(200)
		expect(response.headers.get('Content-Type')).toContain('text/plain')
	})

	it('usa localhost con puerto por defecto cuando no existe site', async () => {
		const previousPort = process.env.PORT
		delete process.env.PORT

		const response = await GET({} as any)
		const body = await response.text()

		expect(body).toContain('User-agent: *')
		expect(body).toContain('Allow: /')
		expect(body).toContain('Sitemap: http://localhost:4321/sitemap-index.xml')

		if (previousPort === undefined) {
			delete process.env.PORT
		} else {
			process.env.PORT = previousPort
		}
	})

	it('prioriza site.origin cuando está disponible', async () => {
		const response = await GET({
			site: new URL('https://portfolio.example.com')
		} as any)
		const body = await response.text()

		expect(body).toContain(
			'Sitemap: https://portfolio.example.com/sitemap-index.xml'
		)
	})
})
