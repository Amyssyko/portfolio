import { useEffect, useState } from 'react'

const Footer = () => {
	const [time, setTime] = useState<string>(
		new Date().toLocaleDateString('es-ES', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric'
		})
	)

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(
				new Date().toLocaleDateString('es-ES', {
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric',
					hour: 'numeric',
					minute: 'numeric',
					second: 'numeric'
				})
			)
		}, 1000)
		return () => clearInterval(interval)
	}, [])

	return (
		<footer className='grid place-content-center place-items-center border-t-2'>
			<p>© {new Date().getFullYear()} Amyssyko </p>
			<div>
				<h6>
					Fecha actual: <span>{time}</span>
				</h6>
			</div>
		</footer>
	)
}

export default Footer
