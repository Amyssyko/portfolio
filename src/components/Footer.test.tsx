import { describe, expect, it } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import Footer from './Footer'

describe('Footer', () => {
	it('renderiza copyright y nombre', () => {
		const html = renderToStaticMarkup(<Footer />)
		const currentYear = new Date().getFullYear()

		expect(html).toContain(`© ${currentYear} Amyssyko`)
	})

	it('muestra una marca de tiempo formateada', () => {
		const html = renderToStaticMarkup(<Footer />)

		expect(html).toContain('<span')
		expect(html).toContain(':')
	})
})
