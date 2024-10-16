import type { Experience } from '@/env'
import SectionContainer from '@components/section-container'

const data: Experience[] = [
	{
		id: 1,
		role: 'Desarrollador Full Stack',
		company: 'Freelancer',
		date: '2022 - Actualidad',
		description:
			'Diseño y desarrollo de aplicaciones web y móviles, utilizando tecnologías como Node.js, React, Flutter, Next.js, AstroJS, DJango, etc.',
		more: 'Mas información',
		url: 'https://github.com/Amyssyko'
	},
	{
		id: 2,
		role: 'Desarrollador App Móviles',
		company: 'Universidad Técnica de Cotopaxi',
		date: '2024',
		description:
			'Desarrollo de aplicación móvil para la universidad, utilizando tecnologías como Flutter, Supabase, PowerSync, etc.',
		more: 'Mas información',
		url: 'https://play.google.com/store/apps/details?id=com.malki.machay.turistico'
	}
]

const WorkExperience = () => {
	return (
		<SectionContainer
			id='experience'
			data-section='experience'>
			<h2 className='mb-6 flex items-center gap-x-3 text-3xl font-semibold text-green-600'>
				<svg
					className='size-8'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					strokeWidth='2'
					stroke='currentColor'
					fill='none'
					strokeLinecap='round'
					strokeLinejoin='round'>
					<path
						stroke='none'
						d='M0 0h24v24H0z'
						fill='none'></path>
					<path d='M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z'></path>
					<path d='M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2'></path>
					<path d='M12 12l0 .01'></path>
					<path d='M3 13a20 20 0 0 0 18 0'></path>
				</svg>
				Experiencia laboral
			</h2>
			<ol>
				{data.map(({ company, date, description, id, more, role, url }) => {
					return (
						<li key={id}>
							<div className="relative mx-12 pb-12 before:absolute before:left-[-35px] before:block before:h-full before:border-l-2 before:border-black/20 before:content-[''] dark:before:border-white/15 md:gap-10 md:space-x-4">
								<div className='grid place-content-center items-stretch pt-1 md:grid-cols-2'>
									<div className='sticky top-0'>
										<span className='absolute -left-[43px] rounded-full text-5xl text-primary'>
											•
										</span>
										<h3 className='text-balance text-xl font-bold text-yellow-500'>
											{role}
										</h3>
										<h4 className='text-balance text-xl font-semibold text-gray-600 dark:text-white'>
											{company}
										</h4>
										<time className='m-0 p-0 text-sm text-gray-600/80 dark:text-white/80'>
											{date}
										</time>
									</div>
									<div className='relative pb-4 text-gray-600 dark:text-gray-300'>
										<p className='text-pretty'>{description}</p>
										<div className='flex items-center md:justify-start'>
											<a
												referrerPolicy='no-referrer'
												rel='noopener'
												target='_blank'
												href={url}
												role='link'
												className='text-lg font-medium text-yellow-600 hover:text-yellow-700 dark:text-yellow-200 dark:hover:text-yellow-300'>
												{more}
											</a>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='icon icon-tabler icon-tabler-chevron-right w-5'
												width='18'
												height='18'
												viewBox='0 0 24 24'
												strokeWidth='2'
												stroke='currentColor'
												fill='none'
												strokeLinecap='round'
												strokeLinejoin='round'>
												<path
													stroke='none'
													d='M0 0h24v24H0z'
													fill='none'></path>
												<path d='M9 6l6 6l-6 6'></path>
											</svg>
										</div>
									</div>
								</div>
							</div>
						</li>
					)
				})}
			</ol>
		</SectionContainer>
	)
}

export default WorkExperience
