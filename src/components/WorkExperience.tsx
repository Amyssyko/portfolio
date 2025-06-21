import type { Experience } from '@/env'
import SectionContainer from '@components/section-container'

const data: Experience[] = [
	{
		id: 0,
		role: 'Data Management Engineer & Data Governance',
		company: 'Cacpe de Pastaza',
		date: '2024 - Actualidad',
		description:
			'Implementación de sistema de gestión de datos y gobernanza, utilizando tecnologías como Python, SQL, Power BI, etc.',
		more: 'Mas información',
		url: 'https://www.cacpepas.fin.ec/'
	},
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
			<h2 className='flex items-center gap-x-3 mb-6 font-semibold text-green-600 text-3xl'>
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
							<div className="before:block before:left-[-35px] before:absolute relative md:gap-10 md:space-x-4 mx-12 pb-12 dark:before:border-white/15 before:border-black/20 before:border-l-2 before:h-full before:content-['']">
								<div className='items-stretch place-content-center grid md:grid-cols-2 pt-1'>
									<div className='top-0 sticky'>
										<span className='-left-[43px] absolute rounded-full text-primary text-5xl'>
											•
										</span>
										<h3 className='font-bold text-yellow-500 text-xl'>
											{role}
										</h3>
										<h4 className='font-semibold text-gray-600 dark:text-white text-xl'>
											{company}
										</h4>
										<time className='m-0 p-0 text-gray-600/80 dark:text-white/80 text-sm'>
											{date}
										</time>
									</div>
									<div className='relative pb-4 text-gray-600 dark:text-gray-300'>
										<p className=''>{description}</p>
										<div className='flex md:justify-start items-center'>
											<a
												referrerPolicy='no-referrer'
												rel='noopener'
												target='_blank'
												href={url}
												role='link'
												className='font-medium text-yellow-600 hover:text-yellow-700 dark:hover:text-yellow-300 dark:text-yellow-200 text-lg'>
												{more}
											</a>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='icon-tabler icon-tabler-chevron-right w-5 icon'
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
