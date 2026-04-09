import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const pkgPath = resolve(root, 'package.json')
const bunfigPath = resolve(root, 'bunfig.toml')
const bunLockbPath = resolve(root, 'bun.lockb')
const bunLockPath = resolve(root, 'bun.lock')

const fail = (message) => {
	console.error(`❌ ${message}`)
	process.exitCode = 1
}

if (!existsSync(pkgPath)) {
	fail('No se encontró package.json')
	process.exit(process.exitCode ?? 1)
}

const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))

if (!pkg.packageManager || !String(pkg.packageManager).startsWith('bun@')) {
	fail('packageManager debe estar fijado a Bun (ej: bun@1.x.x)')
}

const requiredScripts = ['build', 'lint', 'test']
for (const scriptName of requiredScripts) {
	if (!pkg.scripts?.[scriptName]) {
		fail(`Falta script requerido en package.json: scripts.${scriptName}`)
	}
}

if (!Array.isArray(pkg.trustedDependencies)) {
	fail(
		'Se requiere trustedDependencies en package.json para controlar postinstall/build scripts'
	)
}

const disallowedRangePattern =
	/^(?:\^|~|>|<|>=|<=|\*|latest|workspace:|file:|link:)/i
for (const section of [
	'dependencies',
	'devDependencies',
	'optionalDependencies',
	'peerDependencies'
]) {
	const deps = pkg[section] ?? {}
	for (const [name, version] of Object.entries(deps)) {
		if (
			typeof version === 'string' &&
			disallowedRangePattern.test(version.trim())
		) {
			fail(`Dependencia no fijada detectada en ${section}: ${name}@${version}`)
		}
	}
}

if (!existsSync(bunLockbPath) && !existsSync(bunLockPath)) {
	fail('Falta lockfile de Bun (bun.lockb o bun.lock)')
}

if (!existsSync(bunfigPath)) {
	fail('Falta bunfig.toml con políticas de instalación seguras')
} else {
	const bunfig = readFileSync(bunfigPath, 'utf8')

	const requires = [
		{ regex: /^\[install\]/m, label: 'sección [install]' },
		{ regex: /^\s*exact\s*=\s*true\s*$/m, label: 'install.exact=true' },
		{
			regex: /^\s*linker\s*=\s*"hoisted"\s*$/m,
			label: 'install.linker="hoisted"'
		}
	]

	for (const rule of requires) {
		if (!rule.regex.test(bunfig)) {
			fail(`bunfig.toml debe incluir ${rule.label}`)
		}
	}

	const blocked = [/\bexact\s*=\s*false\b/m, /\bfrozenLockfile\s*=\s*false\b/m]

	for (const rule of blocked) {
		if (rule.test(bunfig)) {
			fail(`Configuración insegura detectada en bunfig.toml: ${rule}`)
		}
	}
}

if (process.exitCode) {
	process.exit(process.exitCode)
}

console.log('✅ Hardening Bun verificado correctamente.')
