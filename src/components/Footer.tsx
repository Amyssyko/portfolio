import { useEffect, useState } from 'react'

const formatedDate = new Intl.DateTimeFormat('es-ES', {
	weekday: 'short',
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric'
})

const Footer = () => {
	const [time, setTime] = useState<string>(formatedDate.format(new Date()))

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(formatedDate.format(new Date()))
		}, 1000)
		return () => clearInterval(interval)
	}, [])

	return (
		<footer className='grid place-content-center place-items-center'>
			<p>© {new Date().getFullYear()} Amyssyko </p>
			<span>{time}</span>
		</footer>
	)
}

export default Footer
