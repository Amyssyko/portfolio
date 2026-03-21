import { formattedDate } from '@/lib/utils'
import { useEffect, useState } from 'react'

const Footer = () => {
	const [time, setTime] = useState<string>(formattedDate.format(new Date()))

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(formattedDate.format(new Date()))
		}, 1000)
		return () => clearInterval(interval)
	}, [])

	return (
		<footer className='grid place-items-center py-1'>
			<p className=''>© {new Date().getFullYear()} Amyssyko </p>
			<span className='text-xs'>{time}</span>
		</footer>
	)
}

export default Footer
