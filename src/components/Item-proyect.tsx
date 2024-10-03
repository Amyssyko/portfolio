import { useState } from 'react'
import { Toggle } from './ui/toggle'

const ItemProyect = ({
	id,
	title,
	image,
	tegnology,
	description,
	repository,
	website
}: {
	id: number
	title: string
	image: string
	tegnology: { id: number; name: string; icon: JSX.Element }[]
	description: string
	repository: { url: string; icon: JSX.Element }[]
	website: { url: string; icon: JSX.Element }[]
}) => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
	const [isHovered, setIsHovered] = useState(false)

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
		const x = ((e.clientX - left) / width) * 100
		const y = ((e.clientY - top) / height) * 100

		setMousePosition({ x, y })
	}
	return (
		<li
			key={id}
			className='grid grid-cols-1 place-items-center justify-items-center gap-8 lg:grid-cols-2'>
			<div
				className='aspect-video overflow-hidden'
				onMouseMove={handleMouseMove}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}>
				<img
					className={`aspect-video rounded-sm object-contain duration-200 ${
						isHovered ? 'scale-150 contrast-125' : 'scale-100'
					}`}
					src={`${image}.webp`}
					alt={title}
					onBlur={() => setIsHovered(false)}
					aria-label={`Imagen de ${title}`}
					style={{
						transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
					}}
				/>
			</div>
			<div className='grid place-content-center items-center justify-items-center space-y-2'>
				<h3 className='text-balance text-center text-2xl md:text-start md:text-3xl'>
					{title}
				</h3>
				<ul className='flex flex-row gap-2'>
					{tegnology.map(({ id, name, icon }) => (
						<li
							key={id}
							className='[&>button]:bg-sky-800 [&>button]:text-secondary dark:[&>button]:bg-primary-foreground dark:[&>button]:text-secondary-foreground dark:hover:[&>button]:bg-sky-500'>
							<Toggle
								size='sm'
								variant='outline'
								className='space-x-2 px-2 py-4'>
								<span>{icon}</span>
								<h5>{name}</h5>
							</Toggle>
						</li>
					))}
				</ul>

				<p>{description}</p>
				<div className='grid grid-cols-2 place-content-center justify-items-center gap-2'>
					<ul>
						{repository.map(({ url, icon }, index) => (
							<li key={index}>
								<Toggle
									variant='outline'
									className='space-x-2 px-2 py-4 hover:bg-secondary-foreground hover:text-secondary'>
									<span>{icon}</span>
									<a
										referrerPolicy='no-referrer'
										rel='noopener'
										target='_blank'
										href={url}>
										Repositorio
									</a>
								</Toggle>
							</li>
						))}
					</ul>
					<ul className='relative'>
						{website.map(({ url, icon }, index) => (
							<li key={index}>
								<Toggle
									variant='outline'
									className='space-x-2 px-2 py-4 hover:bg-secondary-foreground hover:text-secondary'>
									<span>{icon}</span>
									<a
										referrerPolicy='no-referrer'
										rel='noopener'
										target='_blank'
										href={url}>
										WebSite
									</a>
								</Toggle>
							</li>
						))}
					</ul>
				</div>
			</div>
		</li>
	)
}

export default ItemProyect
