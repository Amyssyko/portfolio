import { describe, expect, it } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import ProyectItem from './project-item'

describe('ProyectItem', () => {
	it('renderiza título, descripción y acciones', () => {
		const html = renderToStaticMarkup(
			<ProyectItem
				id={1}
				title='Proyecto Demo'
				image={{ src: '/demo.png', width: 640, height: 360 } as ImageMetadata}
				technology={[
					{ id: 1, name: 'React', icon: <span>R</span> },
					{ id: 2, name: 'TypeScript', icon: <span>T</span> }
				]}
				description='Descripción de prueba'
				repository={[{ url: 'https://github.com/demo', icon: <span>G</span> }]}
				website={[{ url: 'https://demo.app', icon: <span>W</span> }]}
			/>
		)

		expect(html).toContain('Proyecto Demo')
		expect(html).toContain('Descripción de prueba')
		expect(html).toContain('Repositorio')
		expect(html).toContain('Website')
		expect(html).toContain('https://github.com/demo')
		expect(html).toContain('https://demo.app')
	})
})
