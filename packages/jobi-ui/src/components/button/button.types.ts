// packages/jobi-ui/src/components/button/button.types.ts

/**************************************************************************************/

export type ButtonVariant = 'primary' | 'secondary' | 'contrast' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'xl'
export type ButtonIconPosition = 'left' | 'right'
export type ButtonWidth = 'fit' | 'full'
export type ButtonType = 'submit' | 'reset' | 'button'

/**************************************************************************************/

export interface ButtonProps {
  /**
   * Texte à afficher dans le bouton.
   */
  text?: string

  /**
   * Nom/icône à afficher. Selon l'environnement, ce nom est passé à
   * `@nuxt/icon` (`name`) ou à `@iconify/vue` (`icon`).
   */
  icon?: string

  /**
   * Variante visuelle du bouton.
   * @default 'primary'
   */
  variant?: ButtonVariant

  /**
   * Taille du bouton.
   * @default 'md'
   */
  size?: ButtonSize

  /**
   * Position de l'icône par rapport au texte.
   * @default 'left'
   */
  iconPosition?: ButtonIconPosition

  /**
   * Largeur du bouton.
   * @default 'fit'
   */
  width?: ButtonWidth

  /**
   * Active un fond texturé "noise" qui reprend la couleur du bouton.
   * @default false
   */
  noise?: boolean

  /**
   * Cible de navigation. Si `NuxtLink` est disponible, il est utilisé.
   * Sinon un lien `<a>` est utilisé. Si non défini, un `<button>` est rendu.
   */
  to?: string

  /**
   * Désactive le bouton/lien.
   * @default false
   */
  disabled?: boolean

  /**
   * Type natif du bouton HTML (ignoré si `to` est défini).
   * @default 'button'
   */
  type?: ButtonType
}
