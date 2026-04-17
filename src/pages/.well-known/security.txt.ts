import type { APIRoute } from 'astro'

import { buildSecurityTxt } from '../../lib/security-txt'

export const GET: APIRoute = ({ site }) => {
	return new Response(buildSecurityTxt({ site }), {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	})
}
