import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'

const AboutMe = () => {
	return (
		<section
			id='about-me'
			data-section='about-me'
			className='flex max-w-xl flex-col gap-4'>
			<div className='flex w-full flex-row items-center justify-start gap-4'>
				<Avatar className='size-24'>
					<AvatarImage src='https://github.com/shadcn.png' />
					<AvatarFallback>David</AvatarFallback>
				</Avatar>
				<Button
					variant='outline'
					className='flex border-spacing-2 items-center gap-1 rounded-full border border-primary bg-muted-foreground transition-colors ease-in-out hover:scale-105 hover:bg-muted-foreground'
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
				<h1 className='text-3xl'>Bienvenido, soy David</h1>
				<p className='mt-6 text-xl [&>strong]:font-semibold [&>strong]:text-yellow-500 dark:[&>strong]:text-yellow-200'>
					+2 años de experiencia. &nbsp;
					<strong>
						Ingeniero en Sistemas de Información,desarrollador Full Stack con
						experiencia en el diseño y desarrollo de aplicaciones web y móviles.
					</strong>
					&nbsp; Entusiasta de la innovación tecnológica y la ingeniería de
					software, disfruto adquirir nuevos conocimientos y enfrentar retos
					complejos que impulsen mi crecimiento profesional para optimizar mis
					competencias técnicas.
				</p>

				<div className='flex gap-4 py-4'>
					<Button
						variant='outline'
						className='flex border-spacing-2 items-center gap-1 rounded-full border border-primary bg-muted-foreground transition-colors ease-in-out hover:scale-105 hover:bg-muted-foreground'
						asChild>
						<a
							referrerPolicy='no-referrer'
							rel='noopener'
							target='_blank'
							href='mailto:miduga@gmail.com'>
							Contáctame
						</a>
					</Button>
					<Button
						variant='outline'
						className='flex border-spacing-2 items-center gap-1 rounded-full border border-primary bg-muted-foreground transition-colors ease-in-out hover:scale-105 hover:bg-muted-foreground'
						asChild>
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
		</section>
	)
}

export default AboutMe
