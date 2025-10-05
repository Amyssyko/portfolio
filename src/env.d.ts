/// <reference path="../.astro/types.d.ts" />

export type Project = {
	id: number
	title: string
	image: ImageMetadata
	technology: technology[]
	description: string
	repository: Repository[]
	website: Repository[]
}

type Repository = {
	url: string
	icon: JSX.Element
}

type technology = {
	id: number
	name: string
	icon: JSX.Element
}

export type IconProps = SVGProps<SVGSVGElement>

export type Experience = {
	id: number
	role: string
	company: string
	date: string
	description: string
	more: string
	url: string
}
