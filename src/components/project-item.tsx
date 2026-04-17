import type { Project } from '@/env'
import { useState, type FC } from 'react'
import { Button, buttonVariants } from './ui/button'

const ProyectItem: FC<Project> = ({
	id,
	title,
	image,
	technology,
	description,
	repository,
	website
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
			className='grid grid-cols-1 place-items-center justify-items-center gap-8 md:grid-cols-2'>
			<div
				className='aspect-video overflow-hidden'
				onMouseMove={handleMouseMove}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}>
				<img
					className={`border-border h-full rounded-3xl border object-contain duration-200 md:h-auto ${
						isHovered ? 'scale-150 contrast-125' : 'scale-100'
					}`}
					width={image.width}
					height={image.height}
					loading='lazy'
					decoding='async'
					src={image.src}
					sizes='(min-width: 768px) 464px, 100vw'
					alt={title}
					onBlur={() => setIsHovered(false)}
					aria-label={`Imagen de ${title}`}
					style={{
						transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
					}}
				/>
			</div>
			<div className='grid justify-items-center space-y-2 md:place-content-center md:items-center'>
				<h3 className='text-center text-2xl font-medium md:text-start md:text-3xl'>
					{title}
				</h3>
				<ul className='flex flex-row gap-2'>
					{technology.map(({ id, name, icon }) => (
						<li
							key={id}
							className='duration-200 [&>button]:space-x-1 hover:[&>button]:scale-105'>
							<Button
								size='sm'
								variant='default'>
								<span>{icon}</span>
								<span>{name}</span>
							</Button>
						</li>
					))}
				</ul>

				<p>{description}</p>
				<div className='grid grid-cols-2 place-content-center justify-items-center gap-2'>
					<ul>
						{repository.map(({ url, icon }, index) => (
							<li
								key={index}
								className='duration-200 [&>a]:space-x-1 hover:[&>a]:scale-105'>
								<a
									href={url}
									target='_blank'
									rel='noopener noreferrer'
									referrerPolicy='no-referrer'
									className={buttonVariants({ size: 'sm', variant: 'default' })}
									aria-label='Repositorio en GitHub'>
									<span>{icon}</span>
									<span>Repositorio</span>
								</a>
							</li>
						))}
					</ul>
					<ul className='relative'>
						{website.map(({ url, icon }, index) => (
							<li
								key={index}
								className='duration-200 [&>a]:space-x-1 hover:[&>a]:scale-105'>
								<a
									href={url}
									target='_blank'
									rel='noopener noreferrer'
									referrerPolicy='no-referrer'
									className={buttonVariants({ size: 'sm', variant: 'default' })}
									aria-label='Sitio web del proyecto'>
									<span>{icon}</span>
									<span>Website</span>
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</li>
	)
}

export default ProyectItem
