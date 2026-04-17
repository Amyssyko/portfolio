import { describe, expect, it } from 'bun:test'

import { GET as GETWellKnownSecurityTxt } from '../../pages/.well-known/security.txt'
import { GET as GETSecurityTxt } from '../../pages/security.txt'

describe('GET /security.txt', () => {
	it('responde con contenido de texto plano', async () => {
		const response = await GETSecurityTxt({} as any)

		expect(response.status).toBe(200)
		expect(response.headers.get('Content-Type')).toContain('text/plain')
	})

	it('incluye campos recomendados por RFC 9116', async () => {
		const response = await GETSecurityTxt({} as any)
		const body = await response.text()

		expect(body).toContain('Contact: mailto:sleep.mei.0005@gmail.com')
		expect(body).toContain('Expires: 2027-12-31T23:59:59.000Z')
		expect(body).toContain('Preferred-Languages: es, en')
		expect(body).toContain('Canonical: http://localhost:4321/security.txt')
	})

	it('usa site.origin para el campo Canonical cuando está disponible', async () => {
		const response = await GETSecurityTxt({
			site: new URL('https://portfolio.example.com')
		} as any)
		const body = await response.text()

		expect(body).toContain(
			'Canonical: https://portfolio.example.com/security.txt'
		)
	})
})

describe('GET /.well-known/security.txt', () => {
	it('devuelve el mismo contenido que /security.txt', async () => {
		const [mainResponse, wellKnownResponse] = await Promise.all([
			GETSecurityTxt({ site: new URL('https://portfolio.example.com') } as any),
			GETWellKnownSecurityTxt({
				site: new URL('https://portfolio.example.com')
			} as any)
		])

		const [mainBody, wellKnownBody] = await Promise.all([
			mainResponse.text(),
			wellKnownResponse.text()
		])

		expect(wellKnownResponse.status).toBe(200)
		expect(wellKnownResponse.headers.get('Content-Type')).toContain(
			'text/plain'
		)
		expect(wellKnownBody).toBe(mainBody)
	})
})
