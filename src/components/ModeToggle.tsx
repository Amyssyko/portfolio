import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

type ThemeTogglerProps = {
	className?: string
}

export default function ThemeToggler({ className }: ThemeTogglerProps) {
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
			className={cn('cursor-pointer rounded-full', className)}>
			<SunIcon className='w-[1.2rem] h-[1.2rem] rotate-0 dark:-rotate-90 scale-100 dark:scale-0 transition-all' />
			<MoonIcon className='absolute w-[1.2rem] h-[1.2rem] rotate-90 dark:rotate-0 scale-0 dark:scale-100 transition-all' />
			<span className='sr-only'>Toggle theme</span>
		</Button>
	)
}
