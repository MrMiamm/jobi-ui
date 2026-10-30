// packages/jobi-ui/src/components/theme-switcher/theme-switcher.types.ts

/**************************************************************************************/

export interface ThemeSwitcherProps {
  /**
   * Icône représentant le thème clair, affichée lorsque le thème sombre est actif.
   * @default 'material-symbols:light-mode-rounded'
   */
  lightIcon?: string

  /**
   * Icône représentant le thème sombre, affichée lorsque le thème clair est actif.
   * @default 'material-symbols:dark-mode-rounded'
   */
  darkIcon?: string
}
