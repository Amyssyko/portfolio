import { describe, expect, it } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import WorkExperience from './WorkExperience'

describe('WorkExperience', () => {
	it('renderiza título y experiencias principales', () => {
		const html = renderToStaticMarkup(<WorkExperience />)

		expect(html).toContain('id="experience"')
		expect(html).toContain('Experiencia laboral')
		expect(html).toContain('Cacpe de Pastaza')
		expect(html).toContain('Freelancer')
		expect(html).toContain('Universidad Técnica de Cotopaxi')
	})

	it('incluye enlaces de ver más por cada experiencia', () => {
		const html = renderToStaticMarkup(<WorkExperience />)
		const matches = html.match(/Ver más sobre/g) ?? []

		expect(matches.length).toBe(3)
	})
})
