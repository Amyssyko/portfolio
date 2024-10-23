import SectionContainer from '@components/section-container'

const AboutMe = () => {
	return (
		<SectionContainer
			id='about-me'
			data-section='about-me'
			className='flex flex-col gap-4'>
			<h2 className='mb-6 flex items-center gap-x-3 text-3xl font-semibold text-lime-600'>
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
					<path d='M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20' />
					<path d='M8 11h8' />
					<path d='M8 7h6' />
				</svg>
				Acerca de mí
			</h2>
			<article className='grid place-content-center items-center justify-items-center gap-4 md:mx-1 md:grid-cols-2 md:gap-32'>
				<div className='order-last space-y-4 md:order-first [&>p>strong]:text-lime-600 [&>p]:text-pretty'>
					<p>
						<strong>
							Ingeniero en Sistemas de Información,desarrollador Full Stack con
							experiencia en el diseño y desarrollo de aplicaciones web y
							móviles.
						</strong>
					</p>
					<p>
						Entusiasta de la innovación tecnológica y la ingeniería de software,
						disfruto adquirir nuevos conocimientos y enfrentar retos complejos
						que impulsen mi crecimiento profesional para optimizar mis
						competencias técnicas.
					</p>
					<p>
						<strong>Conocimientos:</strong> HTML, CSS, JavaScript, TypeScript,
						React, Nextjs, Node.js, Express, Astro, Angular, PostgreSQL, MySQL,
						Supabase, entre otros.
					</p>
					<p>
						<strong>Herramientas:</strong> Visual Studio Code, Android Studio,
						Git, Bash, Postman, Slack, Discord, Zoom, Google Meet.
					</p>
					<p>
						<strong>Idiomas:</strong> Español (nativo), Inglés (B1).
					</p>
					<p>
						<strong>Intereses:</strong> Desarrollo de software, diseño web,
						tecnologías web y movil, música, cine y 🐈‍⬛.
					</p>
				</div>
				<div className='aspect-square h-64 shadow-2xl shadow-cyan-500/50'>
					<img
						className='h-64 w-full skew-x-6 rounded-xl border-4 border-neutral-950 object-cover object-top transition duration-500 sm:h-full md:scale-110 md:group-hover:scale-105'
						src='https://avatars.githubusercontent.com/u/69484342'
						alt='name'
					/>
				</div>
			</article>
		</SectionContainer>
	)
}

export default AboutMe
