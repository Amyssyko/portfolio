import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const argv = process.argv.slice(2)
const takeArg = (flag, fallback) => {
	const idx = argv.indexOf(flag)
	if (idx === -1 || idx + 1 >= argv.length) return fallback
	return argv[idx + 1]
}

const inputPath = resolve(
	process.cwd(),
	takeArg('--input', process.env.OSV_RESULTS_PATH || 'osv-results.json')
)
const exceptionsPath = resolve(
	process.cwd(),
	takeArg('--exceptions', 'security/osv-exceptions.json')
)
const thresholdRaw = String(
	takeArg('--threshold', process.env.OSV_FAIL_ON_SEVERITY || 'HIGH')
).toUpperCase()
const enforce =
	String(
		takeArg('--enforce', process.env.OSV_ENFORCE || 'true')
	).toLowerCase() === 'true'

const severityRank = {
	UNKNOWN: 0,
	LOW: 1,
	MODERATE: 2,
	MEDIUM: 2,
	HIGH: 3,
	CRITICAL: 4
}

const normalizeSeverity = (value) => {
	if (!value) return 'UNKNOWN'
	if (typeof value === 'string') {
		const v = value.toUpperCase()
		if (v in severityRank) return v
		if (v.includes('CRIT')) return 'CRITICAL'
		if (v.includes('HIGH')) return 'HIGH'
		if (v.includes('MOD')) return 'MODERATE'
		if (v.includes('MED')) return 'MEDIUM'
		if (v.includes('LOW')) return 'LOW'
	}
	return 'UNKNOWN'
}

const maxSeverity = (values) => {
	let best = 'UNKNOWN'
	for (const value of values) {
		const n = normalizeSeverity(value)
		if (severityRank[n] > severityRank[best]) best = n
	}
	return best
}

if (!existsSync(inputPath)) {
	console.error(`❌ No se encontró el reporte OSV: ${inputPath}`)
	process.exit(1)
}

const report = JSON.parse(readFileSync(inputPath, 'utf8'))

const exceptionsData =
	existsSync(exceptionsPath) ?
		JSON.parse(readFileSync(exceptionsPath, 'utf8'))
	:	{ exceptions: [] }

const now = new Date()
const exceptions =
	Array.isArray(exceptionsData.exceptions) ? exceptionsData.exceptions : []

const validExceptions = exceptions.filter((item) => {
	if (!item?.id || !item?.expiresOn || !item?.reason) return false
	const exp = new Date(String(item.expiresOn))
	return Number.isFinite(exp.getTime()) && exp >= now
})

const findException = (id, aliases, pkgName) => {
	const aliasSet = new Set(
		[id, ...(Array.isArray(aliases) ? aliases : [])].filter(Boolean)
	)
	return validExceptions.find((ex) => {
		if (!aliasSet.has(ex.id)) return false
		if (!ex.package) return true
		return ex.package === pkgName
	})
}

const vulnerabilities = []
for (const result of report.results ?? []) {
	for (const pkg of result.packages ?? []) {
		const pkgName = pkg.package?.name || pkg.package?.purl || 'unknown-package'
		for (const vuln of pkg.vulnerabilities ?? []) {
			const severity = maxSeverity([
				vuln.database_specific?.severity,
				vuln.ecosystem_specific?.severity,
				...(Array.isArray(vuln.severity) ?
					vuln.severity.map((s) => s?.type || s?.score || s)
				:	[])
			])

			const entry = {
				id: vuln.id || 'UNKNOWN-ID',
				aliases: vuln.aliases ?? [],
				package: pkgName,
				severity
			}

			const ex = findException(entry.id, entry.aliases, entry.package)
			if (ex) {
				entry.excepted = true
				entry.exceptionReason = ex.reason
				entry.expiresOn = ex.expiresOn
			}

			vulnerabilities.push(entry)
		}
	}
}

const threshold = normalizeSeverity(thresholdRaw)
const blocking = vulnerabilities.filter(
	(v) => !v.excepted && severityRank[v.severity] >= severityRank[threshold]
)

const summary = vulnerabilities.reduce(
	(acc, v) => {
		acc.total += 1
		acc[v.severity] = (acc[v.severity] ?? 0) + 1
		if (v.excepted) acc.excepted += 1
		return acc
	},
	{
		total: 0,
		excepted: 0,
		UNKNOWN: 0,
		LOW: 0,
		MODERATE: 0,
		MEDIUM: 0,
		HIGH: 0,
		CRITICAL: 0
	}
)

console.log('🔎 OSV policy summary')
console.log(`- Total: ${summary.total}`)
console.log(`- Critical: ${summary.CRITICAL}`)
console.log(`- High: ${summary.HIGH}`)
console.log(`- Moderate/Medium: ${summary.MODERATE + summary.MEDIUM}`)
console.log(`- Low: ${summary.LOW}`)
console.log(`- Excepted (vigentes): ${summary.excepted}`)
console.log(`- Umbral de bloqueo: ${threshold}`)
console.log(`- Enforcement activo: ${enforce}`)

if (blocking.length > 0) {
	console.log(
		`\n⚠️ Vulnerabilidades bloqueantes encontradas (${blocking.length}):`
	)
	for (const v of blocking.slice(0, 20)) {
		console.log(`- ${v.severity} | ${v.id} | ${v.package}`)
	}
	if (blocking.length > 20) {
		console.log(`- ... y ${blocking.length - 20} más`)
	}

	if (enforce) {
		console.error('\n❌ Política OSV incumplida.')
		process.exit(1)
	}

	console.warn(
		'\n🟡 Política OSV en modo reporte (no bloqueante en este evento).'
	)
	process.exit(0)
}

console.log('✅ Política OSV cumplida.')
