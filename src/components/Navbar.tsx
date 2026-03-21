import { useEffect, useState } from 'react'
import { ThemeToggler } from './ModeToggle'

const data = [
	{ id: 1, title: 'Experiencia laboral', value: '#experience' },
	{ id: 2, title: 'Proyectos', value: '#projects' },
	{ id: 3, title: 'Sobre mí', value: '#about-me' },
	{ id: 4, title: 'Contacto', value: '#contact' }
]

const Navbar = () => {
	const [active, setActive] = useState('')
	const [menuOpen, setMenuOpen] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY
			data.forEach((item) => {
				const section = document.querySelector(item.value) as HTMLElement | null
				if (section) {
					const offsetTop = section.offsetTop
					const offsetHeight = section.offsetHeight
					if (
						scrollY >= offsetTop - 100 &&
						scrollY < offsetTop + offsetHeight - 100
					) {
						setActive(item.value)
					}
				}
			})
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<header className='bg-background/95 supports-backdrop-filter:bg-background/80 border-border/50 text-foreground fixed top-0 z-50 w-full border-b shadow-sm backdrop-blur'>
			<nav
				className='mx-auto max-w-7xl px-4 sm:px-6 md:flex md:items-center-safe md:justify-between lg:px-8'
				aria-label='Navegación principal'>
				{/* Contenedor principal */}
				<div className='flex h-16 items-center justify-between md:justify-start'>
					<div className='text-foreground text-xl font-bold'>Mi Portafolio</div>
					{/* Botón hamburguesa */}
					<button
						className='text-foreground focus:outline-none md:hidden'
						onClick={() => setMenuOpen(!menuOpen)}
						aria-label='Abrir menú'>
						<div className='flex flex-col items-center justify-center space-y-1'>
							<span className='bg-foreground block h-0.5 w-6'></span>
							<span className='bg-foreground block h-0.5 w-6'></span>
							<span className='bg-foreground block h-0.5 w-6'></span>
						</div>
					</button>
				</div>

				{/* Menú de navegación */}
				<div
					className={` ${menuOpen ? 'block' : 'hidden'} md:flex md:items-center md:space-x-2`}>
					<ul className='flex flex-col md:flex-row md:items-center md:space-x-6'>
						{data.map((item) => (
							<li
								key={item.id}
								className='before:bg-primary after:bg-primary relative inline-flex cursor-pointer items-center justify-center text-lg font-semibold whitespace-nowrap transition-all ease-in-out before:absolute before:bottom-0 before:left-[50%] before:h-px before:w-0 before:origin-center before:transition-[width] before:duration-700 before:ease-in-out after:absolute after:right-[50%] after:bottom-0 after:h-px after:w-0 after:origin-center after:transition-[width] after:duration-700 after:ease-in-out hover:before:w-[50%] hover:after:w-[50%] md:text-xl'>
								<a
									className={`block px-3 py-2 transition-all duration-300 ease-in-out ${
										active === item.value ?
											'border-primary text-foreground border-b-2'
										:	'text-muted-foreground hover:text-foreground'
									}`}
									href={
										item.value === '#contact' ?
											'mailto:cristian-0005@live.com'
										:	item.value
									}
									rel={
										item.value === '#contact' ?
											'noopener noreferrer'
										:	undefined
									}
									target='_self'
									aria-label={item.title}
									onClick={() => setMenuOpen(false)}>
									{item.title}
								</a>
							</li>
						))}
					</ul>
					<ThemeToggler />
				</div>
			</nav>
		</header>
	)
}

export default Navbar
