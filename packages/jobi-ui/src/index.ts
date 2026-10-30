// packages/jobi-ui/src/index.ts

import type { App } from 'vue'

import Button from './components/button/Button.vue'
import Card from './components/card/Card.vue'
import ThemeSwitcher from './components/theme-switcher/ThemeSwitcher.vue'

export { Button, Card, ThemeSwitcher }
export type * from './components/button/button.types'
export type * from './components/card/card.types'
export type * from './components/theme-switcher/theme-switcher.types'

/**************************************************************************************/

export default {
  /**
   * Enregistre les composants de la librairie globalement dans une application Vue.
   *
   * @param app - Application Vue cible
   */
  install(app: App) {
    app.component('JobiButton', Button)
    app.component('JobiCard', Card)
    app.component('JobiThemeSwitcher', ThemeSwitcher)
  },
}
