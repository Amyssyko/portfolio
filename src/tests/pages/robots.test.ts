import { describe, expect, it } from 'bun:test'
import { GET } from '../../pages/robots.txt'

type RobotsRouteContext = Parameters<typeof GET>[0]

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

const mockCache: RobotsRouteContext['cache'] = {
	enabled: false,
	set: () => {},
	tags: [],
	options: {},
	invalidate: async () => {}
}

const getActionResult: RobotsRouteContext['getActionResult'] = () => undefined

const callAction: RobotsRouteContext['callAction'] = async () => {
	throw new Error('No action handler configured for this unit test')
}

const createRouteContext = (site?: URL): RobotsRouteContext => {
	const requestUrl =
		site?.origin ? `${site.origin}/robots.txt` : 'http://localhost/robots.txt'
	const request = new Request(requestUrl)
	const url = new URL(request.url)

	return {
		site,
		generator: 'Astro vtest',
		clientAddress: '127.0.0.1',
		cookies: mockCookies as unknown as RobotsRouteContext['cookies'],
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
		routePattern: '/robots.txt'
	}
}

describe('GET /robots.txt', () => {
	it('responde con contenido de texto plano', async () => {
		const response = await GET(createRouteContext())

		expect(response.status).toBe(200)
		expect(response.headers.get('Content-Type')).toContain('text/plain')
	})

	it('usa localhost con puerto por defecto cuando no existe site', async () => {
		const previousPort = process.env.PORT
		delete process.env.PORT

		const response = await GET(createRouteContext())
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
		const response = await GET(
			createRouteContext(new URL('https://portfolio.example.com'))
		)
		const body = await response.text()

		expect(body).toContain(
			'Sitemap: https://portfolio.example.com/sitemap-index.xml'
		)
	})
})
