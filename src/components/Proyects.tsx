import type { Project } from '@/env'
import ProyectItem from '@components/proyect-item'
import SectionContainer from '@components/section-container'
import {
	BrowserIcon,
	GithubIcon,
	NextjsIcon,
	ReactIcon,
	TailwindCSSIcon,
	ViteIcon
} from '@ui/icon'
const urlGithub = 'https://github.com/Amyssyko'

import mantenimientoImage from '/images/537shots_so.webp'
import searchMediaIamge from '/images/639shots_so.webp'
import restaurantImage from '/images/732shots_so.webp'

const data: Project[] = [
	{
		id: 1,
		image: searchMediaIamge,
		title: 'Buscador de Multimedia',
		tegnology: [
			{
				id: 1,
				name: 'Vite',
				icon: <ViteIcon />
			},
			{ id: 2, name: 'TailwindCSS', icon: <TailwindCSSIcon /> },
			{ id: 3, name: 'React', icon: <ReactIcon /> }
		],
		description: 'Busca imágenes, videos  y descarga archivos de Pixabay.',
		repository: [{ url: `${urlGithub}/galeria-pixabay`, icon: <GithubIcon /> }],
		website: [
			{ url: 'https://galeria-pixabay.vercel.app/', icon: <BrowserIcon /> }
		]
	},
	{
		id: 2,
		image: restaurantImage,
		title: 'Restaurantes App',
		tegnology: [
			{
				id: 0,
				name: 'NextJS',
				icon: <NextjsIcon />
			},
			{
				id: 1,
				name: 'React',
				icon: <ReactIcon />
			},
			{
				id: 2,
				name: 'TailwindCSS',
				icon: <TailwindCSSIcon />
			}
		],
		description:
			'Aplicación de restaurantes con NextJS con Google Sheets como base de datos.',
		repository: [
			{
				url: `${urlGithub}/nextjs-restaurant-app`,

				icon: <GithubIcon />
			}
		],
		website: [
			{
				url: 'https://nextjs-restaurant-app-nine.vercel.app/',
				icon: <BrowserIcon />
			}
		]
	},
	{
		id: 3,
		image: mantenimientoImage,
		title: 'Juego de Mantenimiento de PC',
		tegnology: [
			{ id: 1, name: 'Vite', icon: <ViteIcon /> },
			{ id: 2, name: 'TailwindCSS', icon: <TailwindCSSIcon /> },
			{ id: 3, name: 'React', icon: <ReactIcon /> }
		],
		description: 'Responde a preguntas de mantenimiento equipos de cómputo.',
		repository: [
			{ url: `${urlGithub}/mantenimiento-game`, icon: <GithubIcon /> }
		],
		website: [
			{ url: 'https://mantenimiento-game.vercel.app/', icon: <BrowserIcon /> }
		]
	}
]
const Proyects = () => {
	return (
		<SectionContainer
			id='projects'
			data-section='proyects'>
			<h2 className='relative flex items-center gap-x-3 mb-6 font-semibold text-orange-600 text-3xl'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
					className='size-8'>
					<path d='M10 10.5 8 13l2 2.5' />
					<path d='m14 10.5 2 2.5-2 2.5' />
					<path d='M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z' />
				</svg>
				Proyectos
			</h2>

			<ol className='gap-8 grid md:mx-6'>
				{data.map((item) => {
					return (
						<ProyectItem
							key={item.id}
							{...item}
						/>
					)
				})}
			</ol>
		</SectionContainer>
	)
}

export default Proyects
