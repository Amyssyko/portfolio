import { currentExperience } from '@/lib/utils'
import SectionContainer from '@components/section-container'
import { buttonVariants } from '@ui/button'

const About = () => {
	const yearsOfExperience = currentExperience()
	return (
		<SectionContainer
			id='about'
			data-section='about'
			className='grid gap-4 md:grid-cols-2'>
			<div className='order-last flex flex-col items-center justify-center space-y-4'>
				<div className='bg-muted relative size-40 overflow-hidden rounded-full'>
					<img
						loading='lazy'
						decoding='async'
						src='/avatar-amyssyko-320.jpg'
						width={320}
						height={320}
						sizes='160px'
						alt='Amyssyko'
						className='size-full object-cover'
					/>
				</div>
				<a
					referrerPolicy='no-referrer'
					rel='noopener'
					target='_blank'
					href='https://www.linkedin.com/in/amyssyko/'
					className={buttonVariants({
						className:
							'border-primary flex border-spacing-2 items-center gap-1 rounded-full border transition-colors ease-in-out hover:scale-105'
					})}>
					Disponible para trabajar
				</a>
			</div>
			<div>
				<h1 className='text-muted-foreground text-3xl'>
					Bienvenido, soy David
				</h1>
				<p className='mt-6 text-justify sm:text-start md:text-xl [&>strong]:font-semibold [&>strong]:text-yellow-600 dark:[&>strong]:text-yellow-200'>
					{yearsOfExperience} años de experiencia. &nbsp;
					<strong>
						Ingeniero en Sistemas de Información, desarrollador de software,
						actualmente en Data Governance en Cacpe Pastaza.
					</strong>
					&nbsp;
					<br />
					Entusiasta de la innovación tecnológica y la ingeniería de software,
					disfruto adquirir nuevos conocimientos y enfrentar retos complejos que
					impulsen mi crecimiento profesional para optimizar mis competencias
					técnicas.
				</p>
				<div className='flex gap-4 pt-8'>
					<a
						referrerPolicy='no-referrer'
						rel='noopener'
						target='_blank'
						href='mailto:sleep.mei.0005@gmail.com'
						className={buttonVariants({
							className:
								'border-primary flex border-spacing-2 items-center justify-between gap-1 rounded-full border transition-colors ease-in-out hover:scale-105'
						})}>
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
						Contáctame
					</a>
					<a
						referrerPolicy='no-referrer'
						rel='noopener'
						target='_blank'
						href='https://www.linkedin.com/in/amyssyko/'
						className={buttonVariants({
							className:
								'border-primary flex border-spacing-2 items-center justify-between gap-1 rounded-full border transition-colors ease-in-out hover:scale-105'
						})}>
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
						LinkedIn
					</a>
				</div>
			</div>
		</SectionContainer>
	)
}

export default About
