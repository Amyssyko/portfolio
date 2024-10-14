import SectionContainer from './section-container'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'

const About = () => {
	return (
		<SectionContainer
			id='about'
			data-section='about'
			className='grid gap-4 md:grid-cols-2'>
			<div className='order-last flex flex-col items-center justify-center space-y-4'>
				<Avatar className='size-40'>
					<AvatarImage
						src='https://avatars.githubusercontent.com/u/69484342'
						alt='Amyssyko'
					/>
					<AvatarFallback>David</AvatarFallback>
				</Avatar>
				<Button
					type='button'
					className='flex border-spacing-2 items-center gap-1 rounded-full border border-primary transition-colors ease-in-out hover:scale-105'
					asChild>
					<a
						referrerPolicy='no-referrer'
						rel='noopener'
						target='_blank'
						href='https://www.linkedin.com/in/amyssyko/'>
						Disponible para trabajar
					</a>
				</Button>
			</div>
			<div>
				<h1 className='text-3xl font-bold'>Bienvenido, soy David</h1>
				<p className='mt-6 text-justify text-xl sm:text-start [&>strong]:font-semibold [&>strong]:text-yellow-600 dark:[&>strong]:text-yellow-200'>
					+2 años de experiencia. &nbsp;
					<strong>
						Ingeniero en Sistemas de Información, desarrollador Full Stack con
						experiencia en el diseño y desarrollo de aplicaciones web y móviles.
					</strong>
					&nbsp; Entusiasta de la innovación tecnológica y la ingeniería de
					software, disfruto adquirir nuevos conocimientos y enfrentar retos
					complejos que impulsen mi crecimiento profesional para optimizar mis
					competencias técnicas.
				</p>

				<div className='flex gap-4 pt-8'>
					<Button
						type='button'
						className='flex border-spacing-2 items-center justify-between gap-1 rounded-full border border-primary transition-colors ease-in-out hover:scale-105 dark:text-secondary-foreground'>
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
							className='size-4'>
							<path d='M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z' />
							<path d='m21.854 2.147-10.94 10.939' />
						</svg>
						<a
							referrerPolicy='no-referrer'
							rel='noopener'
							target='_blank'
							href='mailto:cristian-0005@live.com'>
							Contáctame
						</a>
					</Button>
					<Button
						type='button'
						className='flex border-spacing-2 items-center justify-between gap-1 rounded-full border border-primary transition-colors ease-in-out hover:scale-105 dark:text-secondary-foreground'>
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
							className='size-4'>
							<path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' />
							<rect
								width='4'
								height='12'
								x='2'
								y='9'
							/>
							<circle
								cx='4'
								cy='4'
								r='2'
							/>
						</svg>
						<a
							referrerPolicy='no-referrer'
							rel='noopener'
							target='_blank'
							href='https://www.linkedin.com/in/amyssyko/'>
							LinkedIn
						</a>
					</Button>
				</div>
			</div>
		</SectionContainer>
	)
}

export default About
