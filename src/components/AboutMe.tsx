import SectionContainer from '@components/section-container'
import { Button } from './ui/button'

const AboutMe = () => {
	return (
		<SectionContainer
			id='about-me'
			data-section='about-me'
			className='flex flex-col gap-4 mt-20'>
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
				<div className='space-y-4 order-last md:order-first [&>p]:font-medium text-gray-600 [&>p>strong]:text-lime-600 dark:text-gray-300 text-justify'>
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
						<Button
							asChild
							className='inline-block mx-1 p-0 align-baseline'
							variant='link'>
							<a
								referrerPolicy='no-referrer'
								target='_blank'
								rel='noopener noreferrer'
								href='https://open.spotify.com/artist/06HL4z0CvFAxyc27GXpf02?si=uqY2xnd2Tim9spmYC7S6zA'>
								Taylor Swift
							</a>
						</Button>
						.
					</p>
				</div>
				<div className='shadow-2xl shadow-cyan-500/50 h-52 aspect-square overflow-clip'>
					<img
						className='border-4 border-neutral-950 w-full sm:h-full object-contain object-top md:scale-110 skew-x-6 transition duration-500'
						src='https://avatars.githubusercontent.com/u/69484342'
						alt='name'
					/>
				</div>
			</article>
		</SectionContainer>
	)
}

export default AboutMe
