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
	const birthYear = new Date('2021-02-21').getFullYear()
	const yearsOfExperience = currentYear - birthYear
	return yearsOfExperience
}

export const urlGithub = 'https://github.com/Amyssyko'

import ciiuImage from '../assets/443shots_464.webp'
import mantenimientoImage from '../assets/537shots_464.webp'
import searchMediaImage from '../assets/639shots_464.webp'
import restaurantImage from '../assets/732shots_464.webp'
import avatar from '../assets/avatar-amyssyko-320.jpg'

export {
	avatar,
	ciiuImage,
	mantenimientoImage,
	restaurantImage,
	searchMediaImage
}
