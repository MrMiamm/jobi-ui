// packages/jobi-ui/src/manifest.ts

import { fileURLToPath } from 'node:url'

/** Dossier source de la librairie. */
export const srcDir = fileURLToPath(new URL('.', import.meta.url))

/** Dossier des composants de la librairie. */
export const componentsDir = fileURLToPath(new URL('./components', import.meta.url))

/** Feuille de style principale de la librairie. */
export const stylePath = fileURLToPath(new URL('./assets/styles/theme.css', import.meta.url))
