import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'

const data = [
	{ id: 1, title: 'Sobre mí', value: '#about-me' },
	{ id: 2, title: 'Experiencia laboral', value: '#experience' },
	{ id: 3, title: 'Proyectos', value: '#projects' },
	{ id: 4, title: 'Contacto', value: '#contact' }
]

const Navbar = () => {
	return (
		<nav className='grid w-full justify-items-center'>
			<ToggleGroup
				className='space-x-4'
				about='Navegación'
				aria-label='Navegación'
				type='single'>
				{data.map((item) => (
					<a
						referrerPolicy='no-referrer'
						rel='noopener'
						target='_self'
						key={item.id}
						href={item.value}
						aria-label={item.title}>
						<ToggleGroupItem
							className='text-xs font-semibold hover:text-primary md:text-lg'
							value={item.value}>
							{item.title}
						</ToggleGroupItem>
					</a>
				))}
			</ToggleGroup>
		</nav>
	)
}

export default Navbar
