import { useEffect, useState } from 'react'

const formatedDate = new Intl.DateTimeFormat('es-ES', {
	weekday: 'short',
	year: 'numeric',
	month: 'short',
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
		<footer className='grid place-content-center place-items-center py-1'>
			<p className=''>© {new Date().getFullYear()} Amyssyko </p>
			<span className='text-xs'>{time}</span>
		</footer>
	)
}

export default Footer
