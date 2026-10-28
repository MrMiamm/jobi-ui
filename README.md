# Jobi-UI

Jobi-UI est une bibliothèque de composants UI basée sur Tailwind CSS pour Vue.js.
Elle est utilisable en Vue natif et via un module Nuxt, à partir d'une source de composants unique.

## Structure

```text
packages/
├─ jobi-ui/          # Cœur Vue : composants, thème et entrée `app.use()`
└─ nuxt-jobi-ui/     # Module Nuxt : auto-import des composants et injection du thème

playgrounds/
├─ vue/              # Démo Vue + Vite
└─ nuxt/             # Démo Nuxt
```

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev:vue        # Playground Vue
npm run dev:nuxt       # Playground Nuxt
npm run typegen:nuxt   # Génère les types Nuxt (optionnel, utile pour l'IDE)
```

## Vérifications

```bash
npm run type-check
npm run lint
npm run test:unit
npm run build
```

## Utilisation

### Vue

```ts
import { createApp } from 'vue'
import JobiUI from 'jobi-ui'
import 'jobi-ui/style.css'

import App from './App.vue'

createApp(App).use(JobiUI).mount('#app')
```

Les composants sont alors disponibles globalement (`<JobiButton />`) et peuvent aussi être importés un par un :

```ts
import { Button } from 'jobi-ui'
```

### Nuxt

```ts
export default defineNuxtConfig({
  modules: ['nuxt-jobi-ui'],
  jobiUi: {
    // Préfixe des composants, `false` pour le désactiver.
    prefix: 'Jobi',
  },
})
```

Le module enregistre les composants de `jobi-ui` (`<JobiButton />`) et ajoute le thème Tailwind.
