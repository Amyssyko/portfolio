type ThemeTogglerProps = {
	className?: string
}

type IconProps = {
	className?: string
}

const SunIcon = ({ className }: IconProps) => (
	<svg
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		aria-hidden='true'
		className={className}>
		<circle
			cx='12'
			cy='12'
			r='4'
		/>
		<path d='M12 2v2' />
		<path d='M12 20v2' />
		<path d='m4.93 4.93 1.41 1.41' />
		<path d='m17.66 17.66 1.41 1.41' />
		<path d='M2 12h2' />
		<path d='M20 12h2' />
		<path d='m6.34 17.66-1.41 1.41' />
		<path d='m19.07 4.93-1.41 1.41' />
	</svg>
)

const MoonIcon = ({ className }: IconProps) => (
	<svg
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		aria-hidden='true'
		className={className}>
		<path d='M12 3a7 7 0 1 0 9 9 9 9 0 1 1-9-9z' />
	</svg>
)

export const ThemeToggler = ({ className }: ThemeTogglerProps) => {
	const switchTheme = () => {
		document.documentElement.classList.toggle('dark')
		localStorage.setItem(
			'theme',
			document.documentElement.classList.contains('dark') ? 'dark' : 'light'
		)
	}

	const toggleTheme = () => {
		if (!document.startViewTransition) {
			switchTheme()
			return
		}

		document.startViewTransition(switchTheme)
	}

	return (
		<button
			type='button'
			onClick={toggleTheme}
			className={[
				'hover:bg-secondary dark:hover:bg-primary/85 relative inline-flex size-9 cursor-pointer items-center justify-center overflow-hidden rounded-full transition-all',
				'before:absolute before:inset-0 before:scale-0 before:rounded-full before:border hover:before:scale-100',
				'before:transition-transform before:duration-500 before:ease-in-out',
				'before:border-primary dark:before:border-foreground',
				className
			]
				.filter(Boolean)
				.join(' ')}>
			<SunIcon className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
			<MoonIcon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
			<span className='sr-only'>Toggle theme</span>
		</button>
	)
}
