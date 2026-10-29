// scripts/new-component.js

import { access, mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { createInterface } from 'node:readline/promises'
import { fileURLToPath } from 'node:url'

/*************************************************************************/
// Chemins

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, '..')
const templateDir = path.join(repoRoot, 'templates', 'new-component')
const componentsDir = path.join(repoRoot, 'packages', 'jobi-ui', 'src', 'components')
const indexFile = path.join(repoRoot, 'packages', 'jobi-ui', 'src', 'index.ts')

/*************************************************************************/
// Utilitaires

/** Erreur destinée à l'utilisateur, sans stack trace. */
class UserError extends Error {}

/**
 * Indique si un chemin existe.
 *
 * @param {string} target - Chemin à tester
 * @returns {Promise<boolean>}
 */
async function exists(target) {
  try {
    await access(target)
    return true
  } catch {
    return false
  }
}

/**
 * Demande le nom du composant dans le terminal.
 *
 * @returns {Promise<string>}
 */
async function promptComponentName() {
  const rl = createInterface({ input: process.stdin, output: process.stdout })

  try {
    return await rl.question('Nom du composant : ')
  } finally {
    rl.close()
  }
}

/**
 * Découpe un nom en mots, en gérant les séparateurs et le camelCase.
 *
 * Exemples : `my-card` → `['my', 'card']`, `UIButton` → `['UI', 'Button']`.
 *
 * @param {string} input - Nom saisi par l'utilisateur
 * @returns {string[]}
 */
function splitName(input) {
  return input
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
}

/**
 * Transforme une liste de mots en PascalCase, en conservant les acronymes.
 *
 * @param {string[]} words - Mots issus de `splitName`
 * @returns {string}
 */
function toPascalCase(words) {
  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join('')
}

/**
 * Transforme une liste de mots en kebab-case.
 *
 * @param {string[]} words - Mots issus de `splitName`
 * @returns {string}
 */
function toKebabCase(words) {
  return words.join('-').toLowerCase()
}

/**
 * Valide le nom saisi et retourne ses variantes PascalCase / kebab-case.
 *
 * @param {string} input - Nom saisi par l'utilisateur
 * @returns {{ pascal: string, kebab: string }}
 */
function normalizeName(input) {
  const trimmed = input.trim()

  if (!trimmed) {
    throw new UserError('Le nom du composant ne peut pas être vide.')
  }

  if (!/^[A-Za-z][A-Za-z0-9 _-]*$/.test(trimmed)) {
    throw new UserError(
      'Nom invalide : utilise uniquement des lettres, des chiffres, des espaces, "-" ou "_", et commence par une lettre.',
    )
  }

  const words = splitName(trimmed)
  const pascal = toPascalCase(words)
  const kebab = toKebabCase(words)

  if (!pascal || !kebab) {
    throw new UserError('Impossible de déduire un nom de composant valide.')
  }

  return { pascal, kebab }
}

/**
 * Remplace les occurrences de `Component` / `component` par le nom choisi.
 *
 * @param {string} value - Nom de fichier ou contenu de fichier
 * @param {{ pascal: string, kebab: string }} names - Variantes du nom
 * @returns {string}
 */
function applyName(value, { pascal, kebab }) {
  // Le `(?!s)` évite de remplacer le mot « components » dans les chemins.
  return value.replace(/(?:Component|component)(?!s)/g, (match) =>
    match === 'Component' ? pascal : kebab,
  )
}

/**
 * Copie récursivement le template en renommant les fichiers et leur contenu.
 *
 * @param {string} sourceDir - Dossier source
 * @param {string} targetDir - Dossier de destination
 * @param {{ pascal: string, kebab: string }} names - Variantes du nom
 * @returns {Promise<string[]>} Fichiers créés
 */
async function copyTemplate(sourceDir, targetDir, names) {
  await mkdir(targetDir, { recursive: true })

  const entries = await readdir(sourceDir, { withFileTypes: true })
  const created = []

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name)
    const targetPath = path.join(targetDir, applyName(entry.name, names))

    if (entry.isDirectory()) {
      created.push(...(await copyTemplate(sourcePath, targetPath, names)))
      continue
    }

    const content = await readFile(sourcePath, 'utf8')
    await writeFile(targetPath, applyName(content, names), 'utf8')
    created.push(targetPath)
  }

  return created
}

/**
 * Remplace un bloc de lignes par une version triée incluant la nouvelle ligne.
 *
 * @param {string[]} lines - Lignes du fichier
 * @param {number[]} indices - Indices des lignes du bloc
 * @param {string} newLine - Ligne à ajouter si absente
 * @returns {string[]}
 */
function replaceSortedBlock(lines, indices, newLine) {
  const start = indices[0]
  const block = indices.map((index) => lines[index])

  if (!block.includes(newLine)) {
    block.push(newLine)
  }

  block.sort((a, b) => a.localeCompare(b))

  const remaining = lines.filter((_, index) => !indices.includes(index))
  remaining.splice(start, 0, ...block)

  return remaining
}

/**
 * Ajoute le composant dans `packages/jobi-ui/src/index.ts`.
 *
 * @param {{ pascal: string, kebab: string }} names - Variantes du nom
 * @returns {Promise<string[]>} Avertissements éventuels
 */
async function updateIndexFile({ pascal, kebab }) {
  const importLine = `import ${pascal} from './components/${kebab}/${pascal}.vue'`
  const typeLine = `export type * from './components/${kebab}/${kebab}.types'`
  const globalName = `Jobi${pascal}`
  const warnings = []

  const source = await readFile(indexFile, 'utf8')
  const eol = source.includes('\r\n') ? '\r\n' : '\n'
  let lines = source.split(/\r?\n/)

  /*************************************************************************/
  // Imports

  const importIndices = []
  const importPattern = /^import\s+\w+\s+from\s+'\.\/components\/[^']+\.vue'$/

  lines.forEach((line, index) => {
    if (importPattern.test(line)) {
      importIndices.push(index)
    }
  })

  if (importIndices.length === 0) {
    warnings.push(`Import à ajouter manuellement : ${importLine}`)
  } else {
    lines = replaceSortedBlock(lines, importIndices, importLine)
  }

  /*************************************************************************/
  // Export nommé

  const namedExportIndex = lines.findIndex((line) => /^export\s+\{[^}]*\}$/.test(line))

  if (namedExportIndex === -1) {
    warnings.push(`Ajouter ${pascal} dans l'export nommé de index.ts`)
  } else {
    const match = lines[namedExportIndex].match(/^export\s+\{([^}]*)\}$/)
    const names = match[1]
      .split(',')
      .map((name) => name.trim())
      .filter(Boolean)

    if (!names.includes(pascal)) {
      names.push(pascal)
    }

    names.sort((a, b) => a.localeCompare(b))
    lines[namedExportIndex] = `export { ${names.join(', ')} }`
  }

  /*************************************************************************/
  // Export des types

  const typeIndices = []
  const typePattern = /^export type \* from '\.\/components\/[^']+\.types'$/

  lines.forEach((line, index) => {
    if (typePattern.test(line)) {
      typeIndices.push(index)
    }
  })

  if (typeIndices.length === 0) {
    warnings.push(`Ligne de types à ajouter manuellement : ${typeLine}`)
  } else {
    lines = replaceSortedBlock(lines, typeIndices, typeLine)
  }

  /*************************************************************************/
  // Enregistrement global

  const appIndices = []
  const appPattern = /^(\s*)app\.component\('([^']+)',\s*(\w+)\)$/

  lines.forEach((line, index) => {
    if (appPattern.test(line)) {
      appIndices.push(index)
    }
  })

  if (appIndices.length === 0) {
    warnings.push(
      `Enregistrement global à ajouter manuellement : app.component('${globalName}', ${pascal})`,
    )
  } else {
    const indent = lines[appIndices[0]].match(appPattern)[1] || '    '
    const appLine = `${indent}app.component('${globalName}', ${pascal})`
    lines = replaceSortedBlock(lines, appIndices, appLine)
  }

  await writeFile(indexFile, lines.join(eol), 'utf8')

  return warnings
}

/*************************************************************************/
// Point d'entrée

async function main() {
  const input = process.argv[2] ?? (await promptComponentName())
  const names = normalizeName(input)

  if (!(await exists(templateDir))) {
    throw new UserError(`Template introuvable : ${path.relative(repoRoot, templateDir)}`)
  }

  if (!(await exists(indexFile))) {
    throw new UserError(`Fichier introuvable : ${path.relative(repoRoot, indexFile)}`)
  }

  const targetDir = path.join(componentsDir, names.kebab)

  if (await exists(targetDir)) {
    throw new UserError(`Le dossier existe déjà : ${path.relative(repoRoot, targetDir)}`)
  }

  const created = await copyTemplate(templateDir, targetDir, names)

  console.log(`\n✔ Composant ${names.pascal} créé dans ${path.relative(repoRoot, targetDir)}`)

  for (const file of created) {
    console.log(`  - ${path.relative(repoRoot, file)}`)
  }

  const warnings = await updateIndexFile(names)

  if (warnings.length === 0) {
    console.log(`✔ ${path.relative(repoRoot, indexFile)} mis à jour`)
  } else {
    console.log(`\n⚠ ${path.relative(repoRoot, indexFile)} : action manuelle requise`)

    for (const warning of warnings) {
      console.log(`  - ${warning}`)
    }
  }

  console.log('')
}

main().catch((error) => {
  if (error instanceof UserError) {
    console.error(`\n✖ ${error.message}\n`)
  } else {
    console.error(error)
  }

  process.exitCode = 1
})
