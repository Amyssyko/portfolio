type SecurityTxtParams = {
	site?: URL
}

const CONTACT_EMAIL = 'sleep.mei.0005@gmail.com'
const EXPIRES_AT = '2027-12-31T23:59:59.000Z'
const DEFAULT_PORT = 4321

export const buildSecurityTxt = ({ site }: SecurityTxtParams): string => {
	const port = process.env.PORT || DEFAULT_PORT
	const siteUrl = site?.origin ?? `http://localhost:${port}`

	return `Contact: mailto:${CONTACT_EMAIL}
Expires: ${EXPIRES_AT}
Preferred-Languages: es, en
Canonical: ${siteUrl}/security.txt
`
}
