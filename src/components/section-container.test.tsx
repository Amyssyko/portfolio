import { describe, expect, it } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import SectionContainer from './section-container'

describe('SectionContainer', () => {
	it('renderiza id, data-section y aria-labelledby', () => {
		const html = renderToStaticMarkup(
			<SectionContainer id='about'>Contenido</SectionContainer>
		)

		expect(html).toContain('<section')
		expect(html).toContain('id="about"')
		expect(html).toContain('aria-labelledby="about"')
		expect(html).toContain('data-section="about"')
		expect(html).toContain('Contenido')
	})

	it('combina clases base con className adicional', () => {
		const html = renderToStaticMarkup(
			<SectionContainer
				id='custom'
				className='mt-20'>
				Test
			</SectionContainer>
		)

		expect(html).toContain('class="')
		expect(html).toContain('flex flex-col gap-4')
		expect(html).toContain('mt-20')
	})
})
