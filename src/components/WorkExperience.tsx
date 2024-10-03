const WorkExperience = () => {
	const data = [
		{
			id: 1,
			role: 'Desarrollador Full Stack',
			company: 'Freelancer',
			date: '2022 - Actualidad',
			description:
				'Diseño y desarrollo de aplicaciones web y móviles, utilizando tecnologías como Node.js, React, Flutter, Next.js, AstroJS, DJango, entre otras.',
			more: 'Mas información',
			url: 'https://github.com/Amyssyko'
		}
	]

	return (
		<section
			id='experience'
			data-section='experience'
			className='flex flex-col gap-4'>
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
								<div className='relative gap-36 pb-12 md:flex md:flex-row'>
									<div className='sticky top-0'>
										<span className='absolute -left-[43px] rounded-full text-5xl text-primary'>
											•
										</span>
										<h3 className='text-xl font-bold text-yellow-500'>
											{role}
										</h3>
										<h4 className='text-xl font-semibold text-gray-600 dark:text-white'>
											{company}
										</h4>
										<time className='m-0 p-0 text-sm text-gray-600/80 dark:text-white/80'>
											{date}
										</time>
									</div>
									<div className='relative gap-2 pb-4 text-gray-600 dark:text-gray-300'>
										<p>{description}</p>
										<a
											referrerPolicy='no-referrer'
											rel='noopener'
											target='_blank'
											href={url}
											role='link'
											className='flex items-center justify-start text-lg font-medium text-yellow-600 hover:text-yellow-700 dark:text-yellow-200 dark:hover:text-yellow-300'>
											{more}
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='icon icon-tabler icon-tabler-chevron-right w-5'
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
												<path d='M9 6l6 6l-6 6'></path>
											</svg>
										</a>
									</div>
								</div>
							</div>
						</li>
					)
				})}
			</ol>
		</section>
	)
}

export default WorkExperience
