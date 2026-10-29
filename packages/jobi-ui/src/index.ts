// packages/jobi-ui/src/index.ts

import type { App } from 'vue'

import Button from './components/button/Button.vue'
import Card from './components/card/Card.vue'

export { Button, Card }
export type * from './components/button/button.types'
export type * from './components/card/card.types'

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
  },
}
