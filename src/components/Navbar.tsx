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
						<li key={item.id}>
							<a
								className='relative inline-flex cursor-pointer items-center justify-center whitespace-nowrap text-lg font-semibold text-primary transition-all ease-in-out before:absolute before:bottom-0 before:left-[50%] before:h-[1px] before:w-0 before:origin-center before:bg-gray-100 before:transition-[width] before:duration-700 before:ease-in-out after:absolute after:bottom-0 after:right-[50%] after:h-[1px] after:w-0 after:origin-center after:bg-gray-100 after:transition-[width] after:duration-700 after:ease-in-out hover:text-secondary-foreground hover:before:w-[50%] hover:after:w-[50%] md:text-xl'
								referrerPolicy='no-referrer'
								rel='noopener'
								target='_self'
								href={
									item.value === '#contact' ?
										'mailto:miduga@gmail.com'
									:	item.value
								}
								aria-label={item.title}>
								{item.title}
							</a>
						</li>
					))}
				</ul>
			</nav>
		</header>
	)
}

export default Navbar
