const data = [
	{ id: 1, title: 'Sobre mí', value: '#about-me' },
	{ id: 2, title: 'Experiencia laboral', value: '#experience' },
	{ id: 3, title: 'Proyectos', value: '#projects' },
	{ id: 4, title: 'Contacto', value: '#contact' }
]

const Navbar = () => {
	return (
		<header className='w-full'>
			<nav
				className='justify-items-center grid overflow-x-clip'
				aria-label='Navegación'>
				<ul className='flex space-x-4'>
					{data.map((item) => (
						<li key={item.id}>
							<a
								className='inline-flex after:right-[50%] before:bottom-0 after:bottom-0 before:left-[50%] before:absolute after:absolute relative justify-center items-center before:bg-primary after:bg-primary dark:before:bg-gray-100 dark:after:bg-gray-100 before:w-0 after:w-0 hover:before:w-[50%] hover:after:w-[50%] before:h-px after:h-px font-semibold text-primary hover:text-secondary-foreground dark:hover:text-gray-100 text-lg md:text-xl whitespace-nowrap before:origin-center after:origin-center transition-all before:transition-[width] after:transition-[width] before:duration-700 after:duration-700 ease-in-out before:ease-in-out after:ease-in-out cursor-pointer'
								rel={
									item.value === '#contact' ? 'noopener noreferrer' : undefined
								}
								target='_self'
								href={
									item.value === '#contact' ?
										'mailto:cristian-0005@live.com'
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
