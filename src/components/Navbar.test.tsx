import { describe, expect, it } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import Navbar from './Navbar'

describe('Navbar', () => {
	it('renderiza el branding y las secciones de navegación', () => {
		const html = renderToStaticMarkup(<Navbar />)

		expect(html).toContain('Mi Portafolio')
		expect(html).toContain('Experiencia laboral')
		expect(html).toContain('Proyectos')
		expect(html).toContain('Sobre mí')
		expect(html).toContain('Contacto')
	})

	it('incluye enlace mailto para contacto y botón de tema', () => {
		const html = renderToStaticMarkup(<Navbar />)

		expect(html).toContain('mailto:cristian-0005@live.com')
		expect(html).toContain('Toggle theme')
	})
})
