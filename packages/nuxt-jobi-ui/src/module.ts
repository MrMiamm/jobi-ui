// packages/nuxt-jobi-ui/src/module.ts

import { addComponentsDir, addVitePlugin, defineNuxtModule } from '@nuxt/kit'
import tailwindcss from '@tailwindcss/vite'
import { componentsDir, srcDir, stylePath } from 'jobi-ui/manifest'

/**************************************************************************************/

/** Options du module Nuxt `nuxt-jobi-ui`. */
export interface ModuleOptions {
  /**
   * Préfixe appliqué aux noms des composants.
   * Mettre `false` pour les exposer sans préfixe.
   * @default 'Jobi'
   */
  prefix?: string | false
}

/**************************************************************************************/

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-jobi-ui',
    configKey: 'jobiUi',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  defaults: {
    prefix: 'Jobi',
  },
  setup(options, nuxt) {
    nuxt.options.css.push(stylePath)

    addVitePlugin(tailwindcss())
    addComponentsDir({
      path: componentsDir,
      extensions: ['.vue'],
      prefix: options.prefix || undefined,
    })

    // En développement, la librairie est un workspace situé hors de la racine Nuxt.
    nuxt.options.vite.server ||= {}
    nuxt.options.vite.server.fs ||= {}
    nuxt.options.vite.server.fs.allow ||= []
    nuxt.options.vite.server.fs.allow.push(srcDir)
  },
})
