// packages/jobi-ui/src/components/card/card.types.ts

/**************************************************************************************/

export type CardVariant = 'primary' | 'secondary' | 'contrast' | 'ghost'

/**************************************************************************************/

export interface CardProps {
  /**
   * Active un fond texturé "noise" qui reprend les couleurs du dégradé de la carte.
   * @default false
   */
  noise?: boolean

  /**
   * Animation lors du survol
   * @default false
   */
  hoverAnimation?: boolean

  /**
   * Rajoute une ombre portée
   * @default false
   */
  shadow?: boolean

  /**
   * Variante visuelle de la carte.
   * @default 'primary'
   */
  variant?: CardVariant
}
