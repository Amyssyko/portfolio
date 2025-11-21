import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

type ThemeTogglerProps = {
	className?: string
}

export const ThemeToggler = ({ className }: ThemeTogglerProps) => {
	const [_, setTheme] = useState<'light' | 'dark'>('light')

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
		setTheme(mediaQuery.matches ? 'dark' : 'light')

		const handleChange = (e: MediaQueryListEvent) => {
			setTheme(e.matches ? 'dark' : 'light')
		}

		mediaQuery.addEventListener('change', handleChange)
		return () => mediaQuery.removeEventListener('change', handleChange)
	}, [])

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
		<Button
			onClick={toggleTheme}
			variant='ghost'
			size='icon'
			className={cn(
				'hover:bg-secondary dark:hover:bg-primary/85 relative cursor-pointer overflow-hidden rounded-full',
				// Borde animado con color dinámico
				'before:absolute before:inset-0 before:scale-0 before:rounded-full before:border hover:before:scale-100',
				'before:transition-transform before:duration-500 before:ease-in-out',
				'before:border-primary dark:before:border-white', // ← Aquí se aplica el color blanco en modo oscuro
				className
			)}>
			<SunIcon className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
			<MoonIcon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
			<span className='sr-only'>Toggle theme</span>
		</Button>
	)
}
