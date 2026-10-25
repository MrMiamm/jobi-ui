// src/components/button/use-button-link.ts

import { computed } from 'vue'
import { resolveGlobalComponent } from '../../utils/optional-components'

/**************************************************************************************/

/**
 * Gère la résolution du tag et des props pour le rendu en lien ou bouton.
 * Si `to` est fourni :
 * - Utilise `NuxtLink` s'il est enregistré globalement (contexte Nuxt)
 * - Sinon utilise un lien `<a>` standard
 * Si `to` n'est pas fourni, rend un `<button>` natif.
 *
 * @param params - Paramètres de configuration
 * @param params.to - Cible de navigation
 * @param params.type - Type natif du bouton HTML
 * @param params.disabled - Indique si l'élément est désactivé
 * @returns Objet contenant le tag, les props et l'état du lien
 */
export function useButtonLink(params: {
  to: () => string | undefined
  type: () => 'submit' | 'reset' | 'button' | undefined
  disabled: () => boolean | undefined
}) {
  const nuxtLink = resolveGlobalComponent('NuxtLink')

  /** Indique s'il s'agit d'un lien (plutôt qu'un bouton natif). */
  const isLink = computed(() => !!params.to())

  /** Tag à utiliser pour le rendu du composant dynamique. */
  const componentTag = computed(() => {
    const to = params.to()
    if (!to) return 'button'
    return nuxtLink ?? 'a'
  })

  /** Props à passer au composant dynamique selon le type de rendu. */
  const componentProps = computed(() => {
    const to = params.to()
    const disabled = params.disabled()

    if (!to) {
      return {
        type: params.type() ?? 'button',
        disabled,
      }
    }

    if (nuxtLink) {
      return {
        to,
      }
    }

    return {
      href: to,
    }
  })

  return {
    isLink,
    componentTag,
    componentProps,
  }
}
