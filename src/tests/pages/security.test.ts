import { describe, expect, it } from 'bun:test'

import { GET as GETWellKnownSecurityTxt } from '@/pages/.well-known/security.txt'
import { GET as GETSecurityTxt } from '@/pages/security.txt'

type SecurityRouteContext = Parameters<typeof GETSecurityTxt>[0]

const mockCookies = {
	get: () => undefined,
	has: () => false,
	set: () => {},
	delete: () => {},
	merge: () => {},
	headers: function* () {
		yield ''
	}
}

const mockCache: SecurityRouteContext['cache'] = {
	enabled: false,
	set: () => {},
	tags: [],
	options: {},
	invalidate: async () => {}
}

const getActionResult: SecurityRouteContext['getActionResult'] = () => undefined

const callAction: SecurityRouteContext['callAction'] = async () => {
	throw new Error('No action handler configured for this unit test')
}

const createRouteContext = (site?: URL): SecurityRouteContext => {
	const requestUrl =
		site?.origin ?
			`${site.origin}/security.txt`
		:	'http://localhost/security.txt'
	const request = new Request(requestUrl)
	const url = new URL(request.url)

	const context: SecurityRouteContext = {
		site,
		generator: 'Astro vtest',
		clientAddress: '127.0.0.1',
		cookies: mockCookies as unknown as SecurityRouteContext['cookies'],
		session: undefined,
		cache: mockCache,
		request,
		url,
		originPathname: url.pathname,
		getActionResult,
		callAction,
		params: {},
		props: {},
		redirect: (path, status = 302) =>
			new Response(null, {
				status,
				headers: {
					Location: path
				}
			}),
		rewrite: async () => new Response(null, { status: 200 }),
		locals: {},
		preferredLocale: undefined,
		preferredLocaleList: undefined,
		currentLocale: undefined,
		isPrerendered: false,
		csp: undefined,
		routePattern: '/security.txt'
	}

	return context
}

describe('GET /security.txt', () => {
	it('responde con contenido de texto plano', async () => {
		const response = await GETSecurityTxt(createRouteContext())

		expect(response.status).toBe(200)
		expect(response.headers.get('Content-Type')).toContain('text/plain')
	})

	it('incluye campos recomendados por RFC 9116', async () => {
		const response = await GETSecurityTxt(createRouteContext())
		const body = await response.text()

		expect(body).toContain('Contact: mailto:sleep.mei.0005@gmail.com')
		expect(body).toContain('Expires: 2027-12-31T23:59:59.000Z')
		expect(body).toContain('Preferred-Languages: es, en')
		expect(body).toContain('Canonical: /security.txt')
		expect(body).not.toContain('Encryption:')
	})
})

describe('GET /.well-known/security.txt', () => {
	it('devuelve el mismo contenido que /security.txt', async () => {
		const [mainResponse, wellKnownResponse] = await Promise.all([
			GETSecurityTxt(createRouteContext()),
			GETWellKnownSecurityTxt(createRouteContext())
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
