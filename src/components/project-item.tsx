import type { Project } from '@/env'
import { useState, type FC } from 'react'
import { Button } from './ui/button'

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
			className='justify-items-center place-items-center gap-8 grid grid-cols-1 lg:grid-cols-2'>
			<div
				className='aspect-video overflow-hidden'
				onMouseMove={handleMouseMove}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}>
				<img
					className={`h-full rounded-3xl border-zinc-800 object-contain duration-200 md:h-[350px] ${
						isHovered ? 'scale-150 contrast-125' : 'scale-100'
					}`}
					width={500}
					height={500}
					loading='lazy'
					decoding='async'
					src={image.src}
					alt={title}
					onBlur={() => setIsHovered(false)}
					aria-label={`Imagen de ${title}`}
					style={{
						transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
					}}
				/>
			</div>
			<div className='justify-items-center items-center place-content-center space-y-2 grid'>
				<h3 className='font-medium text-2xl md:text-3xl text-center md:text-start'>
					{title}
				</h3>
				<ul className='flex flex-row gap-2'>
					{technology.map(({ id, name, icon }) => (
						<li
							key={id}
							className='[&>button]:space-x-1 dark:[&>button]:bg-secondary dark:hover:[&>button]:bg-slate-600 [&>button]:text-secondary hover:dark:[&>button]:text-white dark:[&>button]:text-white hover:[&>button]:scale-105 duration-200 [&>button]:bg-accent-foreground'>
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
				<div className='justify-items-center place-content-center gap-2 grid grid-cols-2'>
					<ul>
						{repository.map(({ url, icon }, index) => (
							<li
								key={index}
								className='[&>button]:space-x-1 dark:[&>button]:bg-primary dark:hover:[&>button]:bg-slate-600 [&>button]:text-secondary hover:dark:[&>button]:text-white dark:[&>button]:text-white hover:[&>button]:scale-105 duration-200 [&>button]:bg-accent-foreground'>
								<Button
									asChild
									size='sm'
									variant='default'>
									<a
										href={url}
										target='_blank'
										rel='noopener noreferrer'
										referrerPolicy='no-referrer'
										className='inline-flex items-center gap-2'
										aria-label='Repositorio en GitHub'>
										<span>{icon}</span>
										<span>Repositorio</span>
									</a>
								</Button>
							</li>
						))}
					</ul>
					<ul className='relative'>
						{website.map(({ url, icon }, index) => (
							<li
								key={index}
								className='[&>button]:space-x-1 dark:[&>button]:bg-primary dark:hover:[&>button]:bg-slate-600 [&>button]:text-secondary hover:dark:[&>button]:text-white dark:[&>button]:text-white hover:[&>button]:scale-105 duration-200 [&>button]:bg-accent-foreground'>
								<Button
									asChild
									size='sm'
									variant='default'>
									<a
										href={url}
										target='_blank'
										rel='noopener noreferrer'
										referrerPolicy='no-referrer'
										className='inline-flex items-center gap-2'
										aria-label='Sitio web del proyecto'>
										<span>{icon}</span>
										<span>Website</span>
									</a>
								</Button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</li>
	)
}

export default ProyectItem
