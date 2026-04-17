import type { APIRoute } from 'astro'

import { buildSecurityTxt } from '../../lib/security-txt'

export const GET: APIRoute = () => {
	return new Response(buildSecurityTxt(), {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	})
}
