import {
	iconBrowser,
	iconGithub,
	iconNext,
	iconReact,
	iconTailwindCSS,
	iconVite
} from './icons'
import ItemProyect from './Item-proyect'
const urlGithub = 'https://github.com/Amyssyko'

const data = [
	{
		id: 1,
		image: '/639shots_so',
		title: 'Buscador de Multimedia',
		tegnology: [
			{ id: 1, name: 'Vite', icon: iconVite },
			{ id: 2, name: 'TailwindCSS', icon: iconTailwindCSS },
			{ id: 3, name: 'React', icon: iconReact }
		],
		description: 'Busca imágenes, videos en la API de Pixabay.',
		repository: [{ url: `${urlGithub}/galeria-pixabay`, icon: iconGithub }],
		website: [{ url: 'https://galeria-pixabay.vercel.app/', icon: iconBrowser }]
	},
	{
		id: 2,
		image: '732shots_so',
		title: 'Restaurantes App',
		tegnology: [
			{
				id: 0,
				name: 'NextJS',
				icon: iconNext
			},
			{
				id: 1,
				name: 'React',
				icon: iconReact
			},
			{
				id: 2,
				name: 'TailwindCSS',
				icon: iconTailwindCSS
			}
		],
		description: 'Aplicación de restaurantes con NextJS.',
		repository: [
			{
				url: `${urlGithub}/nextjs-restaurant-app`,

				icon: iconGithub
			}
		],
		website: [
			{
				url: 'https://nextjs-restaurant-app-nine.vercel.app/',
				icon: iconBrowser
			}
		]
	},
	{
		id: 3,
		image: '/537shots_so',
		title: 'Juego de Mantenimiento de PC',
		tegnology: [
			{ id: 1, name: 'Vite', icon: iconVite },
			{ id: 2, name: 'TailwindCSS', icon: iconTailwindCSS },
			{ id: 3, name: 'React', icon: iconReact }
		],
		description: 'Responde a preguntas de mantenimiento equipos de cómputo.',
		repository: [{ url: `${urlGithub}/mantenimiento-game`, icon: iconGithub }],
		website: [
			{ url: 'https://mantenimiento-game.vercel.app/', icon: iconBrowser }
		]
	}
]
const Proyects = () => {
	return (
		<section
			id='projects'
			data-section='proyects'
			className='flex flex-col gap-4'>
			<h2 className='relative mb-6 flex items-center gap-x-3 text-3xl font-semibold text-orange-600'>
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

			<ol className='grid gap-8 md:mx-6'>
				{data.map((item) => {
					return <ItemProyect {...item} />
				})}
			</ol>
		</section>
	)
}

export default Proyects
