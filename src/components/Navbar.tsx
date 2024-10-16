import { Button } from '@ui/button'

const data = [
	{ id: 1, title: 'Sobre mí', value: '#about-me' },
	{ id: 2, title: 'Experiencia laboral', value: '#experience' },
	{ id: 3, title: 'Proyectos', value: '#projects' },
	{ id: 4, title: 'Contacto', value: '#contact' }
]

const Navbar = () => {
	return (
		<header className='w-full'>
			<nav className='grid justify-items-center'>
				<ul
					className='flex space-x-4'
					about='Navegación'
					aria-label='Navegación'>
					{data.map((item) => (
						<li
							id='navItems'
							key={item.id}>
							<a
								className='text-xs font-semibold hover:text-primary md:text-lg'
								referrerPolicy='no-referrer'
								rel='noopener'
								target='_self'
								href={
									item.value === '#contact' ?
										'mailto:miduga@gmail.com'
									:	item.value
								}
								aria-label={item.title}>
								<Button
									type='button'
									variant='link'
									value={item.value}>
									{item.title}
								</Button>
							</a>
						</li>
					))}
				</ul>
			</nav>
		</header>
	)
}

export default Navbar
