import { describe, expect, it } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import { ThemeToggler } from './ModeToggle'

describe('ThemeToggler', () => {
	it('renderiza el botón accesible para alternar tema', () => {
		const html = renderToStaticMarkup(<ThemeToggler />)

		expect(html).toContain('type="button"')
		expect(html).toContain('Toggle theme')
		expect(html).toContain('sr-only')
	})
})
