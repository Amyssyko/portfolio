import { describe, expect, it } from 'bun:test'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

describe('index.astro source', () => {
	const source = readFileSync(
		join(import.meta.dir, '..', '..', 'pages', 'index.astro'),
		'utf8'
	)

	it('usa layout principal y título del portfolio', () => {
		expect(source).toContain("<Layout title='Portfolio de Amyssyko'>")
	})

	it('incluye apartados clave en el main', () => {
		expect(source).toContain('<About />')
		expect(source).toContain('<WorkExperience />')
		expect(source).toContain('<Proyects client:visible />')
		expect(source).toContain('<AboutMe />')
	})

	it('incluye navegación y footer con hidratación esperada', () => {
		expect(source).toContain('<Navbar client:idle />')
		expect(source).toContain("<Footer client:only='react' />")
	})
})
