import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const formattedDate = new Intl.DateTimeFormat('es-ES', {
	weekday: 'short',
	year: 'numeric',
	month: 'short',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric'
})

export const currentExperience = (): number => {
	const currentYear = new Date().getFullYear()
	const birthYear = 2021
	const yearsOfExperience = currentYear - birthYear
	return yearsOfExperience
}

export const urlGithub = 'https://github.com/Amyssyko'

import mantenimientoImage from 'src/images/537shots_so.webp'
import searchMediaImage from 'src/images/639shots_so.webp'
import restaurantImage from 'src/images/732shots_so.webp'

export { mantenimientoImage, restaurantImage, searchMediaImage }
