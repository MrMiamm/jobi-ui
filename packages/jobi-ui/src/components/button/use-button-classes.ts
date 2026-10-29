import { computed } from 'vue'

import type { ButtonIconPosition, ButtonSize, ButtonVariant, ButtonWidth } from './button.types'

/**
 * Retourne les classes CSS Tailwind calculées à appliquer selon les propriétés du bouton.
 *
 * @param params - Paramètres de configuration du style du bouton
 * @param params.text - Indique si un texte est présent
 * @param params.icon - Indique si une icône est présente
 * @param params.variant - Variante visuelle du bouton
 * @param params.size - Taille du bouton
 * @param params.iconPosition - Position de l'icône par rapport au texte
 * @param params.width - Largeur du bouton
 * @param params.disabled - Indique si le bouton est désactivé
 * @param params.noise - Indique si le fond texturé "noise" est activé
 * @returns Liste de classes CSS à appliquer
 */
export function useButtonClasses(params: {
  text?: string
  icon?: string
  variant: ButtonVariant
  size: ButtonSize
  iconPosition: ButtonIconPosition
  width: ButtonWidth
  disabled: boolean
  noise: boolean
}) {
  return computed(() => {
    const layoutClasses: string[] = []

    if (params.width === 'fit' && params.text) {
      layoutClasses.push('w-fit')
    }

    if (!params.text && params.icon) {
      layoutClasses.push('justify-center')
    }

    if (!params.text && params.icon) {
      if (params.size === 'sm') layoutClasses.push('w-7', 'h-7')
      if (params.size === 'md') layoutClasses.push('w-11', 'h-11')
      if (params.size === 'xl') layoutClasses.push('w-15', 'h-15')
    }

    if (params.width === 'full' && params.text) {
      layoutClasses.push('w-full')
    }

    if (params.text) {
      if (params.size === 'sm') layoutClasses.push('px-1.5')
      if (params.size === 'md') {
        layoutClasses.push('p-1', 'px-4')
      }
      if (params.size === 'xl') {
        layoutClasses.push('p-2', 'px-6')
      }
    } else {
      if (params.size === 'md') layoutClasses.push('p-1')
      if (params.size === 'xl') layoutClasses.push('p-2')
    }

    if (params.iconPosition === 'left') {
      layoutClasses.push('flex-row')
    }
    if (params.iconPosition === 'right') {
      layoutClasses.push('flex-row-reverse')
    }

    const variantClasses: string[] = []
    if (params.variant === 'primary') {
      variantClasses.push(
        'bg-primary-500',
        'border-primary-400/50',
        'text-light',
        'dark:text-dark',
        'dark:bg-primary-400',
        'hover:bg-primary-600',
        'hover:dark:bg-primary-300',
      )
    }
    if (params.variant === 'secondary') {
      variantClasses.push(
        'bg-secondary-500',
        'border-secondary-400/50',
        'text-light',
        'dark:text-dark',
        'dark:bg-secondary-400',
        'hover:bg-secondary-700',
        'hover:dark:bg-secondary-200',
      )
    }
    if (params.variant === 'contrast') {
      variantClasses.push(
        'text-dark/85',
        'border-dark/65',
        'dark:text-light/85',
        'dark:border-light/65',
        'hover:bg-dark/10',
        'hover:dark:bg-light/10',
      )
    }
    if (params.variant === 'ghost') {
      variantClasses.push('border-transparent', 'hover:border-dark/5', 'hover:dark:border-light/5')
    }

    const sizeTextClasses: string[] = []
    if (params.size === 'sm') sizeTextClasses.push('text-sm')
    if (params.size === 'md') sizeTextClasses.push('text-base')
    if (params.size === 'xl') sizeTextClasses.push('text-xl')

    const stateClasses: string[] = []
    if (params.disabled) {
      stateClasses.push('opacity-50', 'pointer-events-none')
    }

    const effectClasses: string[] = []
    if (params.noise) {
      effectClasses.push('jobi-button--noise')
    }

    return [
      ...layoutClasses,
      ...variantClasses,
      ...sizeTextClasses,
      ...effectClasses,
      ...stateClasses,
    ]
  })
}
