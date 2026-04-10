import { spawnSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'

const runStep = (name, command, args, { allowFailure = false } = {}) => {
	console.log(`\n▶ ${name}`)
	console.log(`$ ${command} ${args.join(' ')}`)

	const result = spawnSync(command, args, {
		stdio: 'inherit',
		env: process.env
	})

	if (result.error) {
		throw result.error
	}

	const exitCode = result.status ?? 1
	if (exitCode !== 0 && !allowFailure) {
		process.exit(exitCode)
	}

	return exitCode
}

const runAuditAndSaveReport = () => {
	console.log('\n▶ Bun audit (captura reporte, no bloqueante)')
	console.log('$ bun audit > bun-audit.txt')

	const result = spawnSync('bun', ['audit'], {
		encoding: 'utf8',
		env: process.env
	})

	if (result.error) {
		throw result.error
	}

	const report = `${result.stdout ?? ''}${result.stderr ?? ''}`
	writeFileSync('bun-audit.txt', report)

	const exitCode = result.status ?? 1
	if (exitCode !== 0) {
		console.warn(
			'⚠ bun audit devolvió código distinto de 0, se continúa para aplicar política.'
		)
	}
}

runStep('Validate Bun hardening config', 'bun', [
	'run',
	'security:check-config'
])
runStep('Check exceptions expiry', 'bun', [
	'run',
	'security:check-exceptions-expiry'
])
runStep('Lint', 'bun', ['run', 'lint'])
runStep('Build', 'bun', ['run', 'build'])
runStep('Test', 'bun', ['run', 'test'])
runAuditAndSaveReport()
runStep('Enforce audit policy', 'bun', [
	'run',
	'security:enforce-audit',
	'--',
	'--bun-report',
	'bun-audit.txt',
	'--policy',
	'security/audit-grace-policy.json'
])
runStep('Generate CycloneDX SBOM', 'bunx', [
	'--bun',
	'@cyclonedx/cdxgen',
	'--output',
	'sbom.cdx.json',
	'--type',
	'js',
	'.'
])

console.log('\n✅ prepush:ci completado correctamente.')
