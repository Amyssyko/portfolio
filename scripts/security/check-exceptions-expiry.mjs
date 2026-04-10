import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const argv = process.argv.slice(2)
const takeArg = (flag, fallback) => {
	const idx = argv.indexOf(flag)
	if (idx === -1 || idx + 1 >= argv.length) return fallback
	return argv[idx + 1]
}

const warnDays = Number.parseInt(
	takeArg('--warn-days', process.env.EXCEPTIONS_EXPIRY_WARN_DAYS || '14'),
	10
)

const enforce =
	String(
		takeArg('--enforce', process.env.EXCEPTIONS_EXPIRY_ENFORCE || 'true')
	).toLowerCase() === 'true'

const sources = [
	{
		name: 'audit',
		path: resolve(process.cwd(), 'security/audit-grace-policy.json')
	},
	{
		name: 'osv',
		path: resolve(process.cwd(), 'security/osv-exceptions.json')
	}
]

const now = new Date()
const msPerDay = 1000 * 60 * 60 * 24

const allExceptions = []

for (const source of sources) {
	if (!existsSync(source.path)) continue

	const data = JSON.parse(readFileSync(source.path, 'utf8'))
	const exceptions = Array.isArray(data.exceptions) ? data.exceptions : []

	for (const item of exceptions) {
		if (!item?.id || !item?.expiresOn) continue
		const exp = new Date(String(item.expiresOn))
		if (!Number.isFinite(exp.getTime())) continue

		const diffDays = Math.ceil((exp.getTime() - now.getTime()) / msPerDay)
		allExceptions.push({
			source: source.name,
			id: String(item.id),
			package: item.package ? String(item.package) : undefined,
			expiresOn: String(item.expiresOn),
			reason: item.reason ? String(item.reason) : '',
			diffDays
		})
	}
}

const expired = allExceptions.filter((x) => x.diffDays < 0)
const expiringSoon = allExceptions.filter(
	(x) => x.diffDays >= 0 && x.diffDays <= warnDays
)

console.log('⏰ Exceptions expiry check')
console.log(`- Total excepciones: ${allExceptions.length}`)
console.log(`- Expiradas: ${expired.length}`)
console.log(`- Expiran en <= ${warnDays} días: ${expiringSoon.length}`)
console.log(`- Enforcement activo: ${enforce}`)

if (expiringSoon.length > 0) {
	console.warn('\n⚠ Excepciones próximas a expirar:')
	for (const ex of expiringSoon) {
		const pkg = ex.package ? ` | ${ex.package}` : ''
		console.warn(
			`- ${ex.source} | ${ex.id}${pkg} | expiresOn=${ex.expiresOn} | en ${ex.diffDays} día(s)`
		)
	}
}

if (expired.length > 0) {
	console.error('\n❌ Excepciones expiradas detectadas:')
	for (const ex of expired) {
		const pkg = ex.package ? ` | ${ex.package}` : ''
		console.error(
			`- ${ex.source} | ${ex.id}${pkg} | expiresOn=${ex.expiresOn} | hace ${Math.abs(ex.diffDays)} día(s)`
		)
	}

	if (enforce) {
		process.exit(1)
	}
}

console.log('✅ Expiry check completado.')
