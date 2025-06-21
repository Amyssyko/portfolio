import SectionContainer from '@components/section-container'

const AboutMe = () => {
	return (
		<SectionContainer
			id='about-me'
			data-section='about-me'
			className='flex flex-col gap-4'>
			<h2 className='flex items-center gap-x-3 mb-6 font-semibold text-lime-600 text-3xl'>
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
			<article className='justify-items-center items-center place-content-center gap-4 md:gap-32 grid md:grid-cols-2 md:mx-1'>
				<div className='space-y-4 order-last md:order-first [&>p>strong]:text-lime-600 [&>p]:'>
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
				<div className='shadow-2xl shadow-cyan-500/50 h-64 aspect-square'>
					<img
						className='border-4 border-neutral-950 rounded-xl w-full h-64 sm:h-full object-cover object-top md:group-hover:scale-105 md:scale-110 skew-x-6 transition duration-500'
						src='https://avatars.githubusercontent.com/u/69484342'
						alt='name'
					/>
				</div>
			</article>
		</SectionContainer>
	)
}

export default AboutMe
