import { cn } from '@lib/utils'
import React, { type FC } from 'react'

type SectionContainerProps = {
	id: string
	className?: string
	children: React.ReactNode
}

const SectionContainer: FC<SectionContainerProps> = ({
	children,
	className,
	id
}) => {
	return (
		<section
			className={cn('flex flex-col gap-4', className)}
			id={id}
			data-section={id}>
			{children}
		</section>
	)
}

export default SectionContainer
