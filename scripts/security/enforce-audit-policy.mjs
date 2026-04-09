import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const argv = process.argv.slice(2)
const takeArg = (flag, fallback) => {
	const idx = argv.indexOf(flag)
	if (idx === -1 || idx + 1 >= argv.length) return fallback
	return argv[idx + 1]
}

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
	const v = String(value).toUpperCase()
	if (v in severityRank) return v
	if (v.includes('CRIT')) return 'CRITICAL'
	if (v.includes('HIGH')) return 'HIGH'
	if (v.includes('MOD')) return 'MODERATE'
	if (v.includes('MED')) return 'MEDIUM'
	if (v.includes('LOW')) return 'LOW'
	return 'UNKNOWN'
}

const extractAdvisoryId = (text) => {
	if (!text) return null
	const raw = String(text)
	const ghsa = raw.match(/GHSA-[a-z0-9-]+/i)
	if (ghsa) return ghsa[0].toUpperCase()
	const cve = raw.match(/CVE-\d{4}-\d+/i)
	if (cve) return cve[0].toUpperCase()
	return null
}

const today = new Date()
const addDays = (date, days) => {
	const d = new Date(date)
	d.setUTCDate(d.getUTCDate() + days)
	return d
}

const bunReportPath = resolve(
	process.cwd(),
	takeArg('--bun-report', process.env.BUN_AUDIT_REPORT_PATH || 'bun-audit.txt')
)
const npmReportPath = resolve(
	process.cwd(),
	takeArg('--npm-report', process.env.NPM_AUDIT_REPORT_PATH || 'npm-audit.json')
)
const policyPath = resolve(
	process.cwd(),
	takeArg('--policy', 'security/audit-grace-policy.json')
)

const enforce =
	String(
		takeArg('--enforce', process.env.AUDIT_ENFORCE || 'true')
	).toLowerCase() === 'true'

const defaultThresholdFromEnv = normalizeSeverity(
	process.env.AUDIT_FAIL_ON_SEVERITY || 'HIGH'
)
const defaultGraceDaysFromEnv = Number.parseInt(
	process.env.AUDIT_GRACE_DAYS || '14',
	10
)

const policy =
	existsSync(policyPath) ?
		JSON.parse(readFileSync(policyPath, 'utf8'))
	:	{
			exceptions: [],
			graceWindow: [],
			defaultThreshold: defaultThresholdFromEnv,
			defaultGraceDays: defaultGraceDaysFromEnv
		}

const threshold = normalizeSeverity(
	policy.defaultThreshold || defaultThresholdFromEnv
)
const defaultGraceDays =
	Number.isFinite(policy.defaultGraceDays) ?
		Number(policy.defaultGraceDays)
	:	defaultGraceDaysFromEnv

const exceptions = Array.isArray(policy.exceptions) ? policy.exceptions : []
const graceWindow = Array.isArray(policy.graceWindow) ? policy.graceWindow : []

const validExceptions = exceptions.filter((item) => {
	if (!item?.id || !item?.expiresOn || !item?.reason) return false
	const exp = new Date(String(item.expiresOn))
	return Number.isFinite(exp.getTime()) && exp >= today
})

const findException = (id, pkgName) => {
	return validExceptions.find((ex) => {
		if (String(ex.id).toUpperCase() !== id) return false
		if (!ex.package) return true
		return ex.package === pkgName
	})
}

const findGrace = (id, pkgName) => {
	return graceWindow.find((item) => {
		if (!item?.id || !item?.detectedOn) return false
		if (String(item.id).toUpperCase() !== id) return false
		if (item.package && item.package !== pkgName) return false
		const detectedOn = new Date(String(item.detectedOn))
		if (!Number.isFinite(detectedOn.getTime())) return false
		const graceDays =
			Number.isFinite(item.graceDays) ?
				Number(item.graceDays)
			:	defaultGraceDays
		const graceUntil = addDays(detectedOn, graceDays)
		return graceUntil >= today
	})
}

const vulnerabilities = []

if (existsSync(bunReportPath)) {
	const lines = readFileSync(bunReportPath, 'utf8').split(/\r?\n/)
	let currentPackage = 'unknown-package'

	for (const line of lines) {
		const packageHeader = line.match(/^([@a-z0-9_.\-/]+)\s{2,}.+/i)
		if (packageHeader && !line.startsWith('  ')) {
			currentPackage = packageHeader[1]
			continue
		}

		const advisory = line.match(
			/^\s+(low|moderate|medium|high|critical):\s+(.+)$/i
		)
		if (!advisory) continue

		const severity = normalizeSeverity(advisory[1])
		const message = advisory[2]
		const id =
			extractAdvisoryId(message) ||
			`BUN:${currentPackage}:${Buffer.from(message).toString('base64').slice(0, 16)}`

		vulnerabilities.push({
			source: 'bun',
			id,
			package: currentPackage,
			severity
		})
	}
}

if (existsSync(npmReportPath)) {
	const npm = JSON.parse(readFileSync(npmReportPath, 'utf8'))
	const npmVuln = npm.vulnerabilities || {}

	for (const [pkgName, detail] of Object.entries(npmVuln)) {
		const severity = normalizeSeverity(detail?.severity)
		const via = Array.isArray(detail?.via) ? detail.via : []

		if (via.length === 0) {
			vulnerabilities.push({
				source: 'npm',
				id: `NPM:${pkgName}:UNKNOWN`,
				package: pkgName,
				severity
			})
			continue
		}

		for (const item of via) {
			if (typeof item === 'string') {
				vulnerabilities.push({
					source: 'npm',
					id: `NPM:${pkgName}:${item}`,
					package: pkgName,
					severity
				})
				continue
			}

			const idFromUrl = extractAdvisoryId(item?.url)
			const idFromTitle = extractAdvisoryId(item?.title)
			const id =
				idFromUrl ||
				idFromTitle ||
				`NPM:${pkgName}:${item?.source || item?.name || 'UNKNOWN'}`

			vulnerabilities.push({
				source: 'npm',
				id,
				package: pkgName,
				severity: normalizeSeverity(item?.severity || severity)
			})
		}
	}
}

for (const v of vulnerabilities) {
	const ex = findException(String(v.id).toUpperCase(), v.package)
	if (ex) {
		v.excepted = true
		v.exceptionReason = ex.reason
		continue
	}

	const gw = findGrace(String(v.id).toUpperCase(), v.package)
	if (gw) {
		v.inGrace = true
		v.graceReason = gw.reason || 'grace window activo'
	}
}

const blocking = vulnerabilities.filter(
	(v) =>
		!v.excepted &&
		!v.inGrace &&
		severityRank[v.severity] >= severityRank[threshold]
)

const summary = vulnerabilities.reduce(
	(acc, v) => {
		acc.total += 1
		acc[v.severity] = (acc[v.severity] ?? 0) + 1
		if (v.excepted) acc.excepted += 1
		if (v.inGrace) acc.inGrace += 1
		return acc
	},
	{
		total: 0,
		excepted: 0,
		inGrace: 0,
		UNKNOWN: 0,
		LOW: 0,
		MODERATE: 0,
		MEDIUM: 0,
		HIGH: 0,
		CRITICAL: 0
	}
)

console.log('🔐 Audit policy summary (bun + npm)')
console.log(`- Total: ${summary.total}`)
console.log(`- Critical: ${summary.CRITICAL}`)
console.log(`- High: ${summary.HIGH}`)
console.log(`- Moderate/Medium: ${summary.MODERATE + summary.MEDIUM}`)
console.log(`- Low: ${summary.LOW}`)
console.log(`- En gracia: ${summary.inGrace}`)
console.log(`- Excepciones vigentes: ${summary.excepted}`)
console.log(`- Umbral de bloqueo: ${threshold}`)
console.log(`- Enforcement activo: ${enforce}`)

if (blocking.length > 0) {
	console.log(
		`\n⚠️ Vulnerabilidades bloqueantes encontradas (${blocking.length}):`
	)
	for (const v of blocking.slice(0, 30)) {
		console.log(`- ${v.severity} | ${v.id} | ${v.package} | ${v.source}`)
	}
	if (blocking.length > 30) {
		console.log(`- ... y ${blocking.length - 30} más`)
	}

	if (enforce) {
		console.error('\n❌ Política de auditoría incumplida.')
		process.exit(1)
	}

	console.warn(
		'\n🟡 Política de auditoría en modo reporte (no bloqueante en este evento).'
	)
	process.exit(0)
}

console.log('✅ Política de auditoría cumplida.')
