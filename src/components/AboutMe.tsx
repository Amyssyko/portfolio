import SectionContainer from '@components/section-container'
import { buttonVariants } from './ui/button'

const AboutMe = () => {
	return (
		<SectionContainer
			id='about-me'
			data-section='about-me'
			className='mt-20 flex flex-col gap-4'>
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
				<div className='order-last space-y-4 text-justify text-gray-600 md:order-first dark:text-gray-300 [&>p]:font-medium [&>p>strong]:text-lime-600'>
					<p>
						<strong>
							Ingeniero en Sistemas de Información, desarrollador de software,
							Data Science con experiencia en data governance y análisis de
							datos.
						</strong>
					</p>
					<p>
						Entusiasta de la innovación tecnológica y la ingeniería de software,
						disfruto adquirir nuevos conocimientos y enfrentar retos complejos
						que impulsen mi crecimiento profesional para optimizar mis
						competencias técnicas.
					</p>
					<p>
						<strong>Herramientas de Desarrollo:</strong> HTML, CSS, TypeScript,
						React, Nextjs, Node.js, Express, Astro, Angular, R, Python, Power
						Bi, entre otros.
					</p>
					<p>
						<strong>Herramientas en Base de Datos:</strong> PostgreSQL, MySQL,
						MSSQL.
					</p>
					<p>
						<strong>Herramientas de Productividad:</strong> Visual Studio Code,
						Android Studio, Git, Bash, Postman, Slack, Discord, Zoom, Google
						Meet, Data Grip, Data Spell, etc.
					</p>
					<p>
						<strong>Idiomas:</strong> Español (nativo), Inglés (B1).
					</p>
					<p>
						<strong>Intereses:</strong> Desarrollo de software, diseño web,
						tecnologías web y movil, música, cine, 🐈‍⬛ &
						<a
							referrerPolicy='no-referrer'
							target='_blank'
							rel='noopener noreferrer'
							href='https://open.spotify.com/track/1rmEsOezwf2lmIZTMAO5Ag?si=80ad2fb24fb54115'
							className={buttonVariants({
								variant: 'link',
								className: 'mx-1 inline-block p-0 align-baseline'
							})}>
							Taylor Swift
						</a>
						.
					</p>
				</div>
				<div className='aspect-square h-52 overflow-clip shadow-2xl shadow-cyan-500/50'>
					<img
						className='w-full skew-x-6 border-4 border-neutral-950 object-contain object-top transition duration-500 sm:h-full md:scale-110'
						src='/avatar-amyssyko-320.jpg'
						width={320}
						height={320}
						sizes='208px'
						alt='name'
						loading='lazy'
					/>
				</div>
			</article>
		</SectionContainer>
	)
}

export default AboutMe
