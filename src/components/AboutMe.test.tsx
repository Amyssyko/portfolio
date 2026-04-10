import { describe, expect, it } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import AboutMe from './AboutMe'

describe('AboutMe', () => {
	it('renderiza sección y contenido de perfil', () => {
		const html = renderToStaticMarkup(<AboutMe />)

		expect(html).toContain('id="about-me"')
		expect(html).toContain('Acerca de mí')
		expect(html).toContain('Herramientas de Desarrollo')
		expect(html).toContain('Idiomas')
		expect(html).toContain('Taylor Swift')
	})
})
