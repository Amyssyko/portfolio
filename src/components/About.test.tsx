import { describe, expect, it } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import About from './About'

describe('About', () => {
	it('renderiza encabezado y CTAs principales', () => {
		const html = renderToStaticMarkup(<About />)

		expect(html).toContain('id="about"')
		expect(html).toContain('Bienvenido, soy David')
		expect(html).toContain('Contáctame')
		expect(html).toContain('LinkedIn')
		expect(html).toContain('Disponible para trabajar')
	})
})
