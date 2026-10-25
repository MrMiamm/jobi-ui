// src/components/button/use-button-icon.ts

import { onMounted, shallowRef, type Component } from 'vue'
import { resolveGlobalComponent } from '../../utils/optional-components'

/**************************************************************************************/

/** Configuration du rendu d'icône pour le composant Button. */
export interface IconRenderer {
  /** Composant d'icône à rendre. */
  component: Component

  /**
   * Nom de la prop à utiliser pour passer le nom/identifiant de l'icône.
   * - `name` pour `@nuxt/icon`
   * - `icon` pour `@iconify/vue`
   */
  prop: 'name' | 'icon'
}

/**************************************************************************************/

/**
 * Gère la résolution et le rendu des icônes pour le composant Button.
 * Priorité :
 * 1. Composant `Icon` enregistré globalement (ex. `@nuxt/icon` dans Nuxt)
 * 2. Import dynamique de `@iconify/vue` en tant que fallback
 * Si aucun n'est disponible, aucune icône ne sera rendue.
 *
 * @param iconName - Nom/icône à afficher (non utilisé pour la résolution, utilisé par le composant)
 * @returns Objet contenant le composant et les props à utiliser
 */
export function useButtonIcon(iconName: () => string | undefined) {
  const globalIcon = resolveGlobalComponent('Icon')

  const iconRenderer = shallowRef<IconRenderer | null>(
    globalIcon ? { component: globalIcon, prop: 'name' } : null,
  )

  /**
   * Tente de charger `@iconify/vue` de manière dynamique si aucune icône
   * globale n'a été trouvée.
   */
  const loadIconifyIcon = async () => {
    if (iconRenderer.value) return
    if (!iconName()) return

    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const mod = await import('@iconify/vue')
      const Icon = mod.Icon ?? mod.default

      if (Icon) {
        iconRenderer.value = { component: Icon as Component, prop: 'icon' }
      }
    } catch {
      // Ni @nuxt/icon ni @iconify/vue ne sont disponibles : on n'affiche pas d'icône.
      iconRenderer.value = null
    }
  }

  onMounted(() => {
    void loadIconifyIcon()
  })

  /** Retourne le composant d'icône à rendre, ou `null` s'il n'y en a pas. */
  const getIconComponent = () => iconRenderer.value?.component ?? null

  /** Retourne les props à passer au composant d'icône. */
  const getIconProps = () => {
    if (!iconRenderer.value) return {}
    const name = iconName()
    return { [iconRenderer.value.prop]: name }
  }

  return {
    iconComponent: getIconComponent,
    iconProps: getIconProps,
  }
}
