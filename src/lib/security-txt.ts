const CONTACT_EMAIL = 'sleep.mei.0005@gmail.com'
const EXPIRES_AT = '2027-12-31T23:59:59.000Z'

export const buildSecurityTxt = (): string => {
	return `Contact: mailto:${CONTACT_EMAIL}
Expires: ${EXPIRES_AT}
Preferred-Languages: es, en
Canonical: /security.txt
`
}
