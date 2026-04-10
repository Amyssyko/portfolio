import { describe, expect, it } from 'bun:test'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

describe('Projects source', () => {
	const source = readFileSync(join(import.meta.dir, 'Projects.tsx'), 'utf8')

	it('define la sección de proyectos y su id', () => {
		expect(source).toContain("id='projects'")
		expect(source).toContain('Proyectos')
	})

	it('incluye los proyectos destacados esperados', () => {
		expect(source).toContain('Buscador de Multimedia')
		expect(source).toContain('Restaurantes App')
		expect(source).toContain('Juego de Mantenimiento de PC')
		expect(source).toContain('CIIU API')
	})
})
