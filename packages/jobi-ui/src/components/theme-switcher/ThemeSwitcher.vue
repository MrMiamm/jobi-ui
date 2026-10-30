<template>
  <JobiButton
    :icon="isDark ? lightIcon : darkIcon"
    variant="ghost"
    size="md"
    @click="toggleTheme"
  />
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'

import JobiButton from '../button/Button.vue'
import type { ThemeSwitcherProps } from './theme-switcher.types'

/*************************************************************************/
// Const / Var

/** Clé de mémorisation du thème dans le `localStorage`. */
const THEME_STORAGE_KEY = 'jobi-theme'

/** Classe appliquée sur `<html>` pour activer le thème sombre. */
const DARK_CLASS = 'dark'

/*************************************************************************/
// Props

withDefaults(defineProps<ThemeSwitcherProps>(), {
  lightIcon: 'material-symbols:light-mode-rounded',
  darkIcon: 'material-symbols:dark-mode-rounded',
})

/*************************************************************************/
// État

/** Indique si le thème sombre est actif. */
const isDark = ref(false)

/*************************************************************************/
// Fonctions

/**
 * Applique le thème donné : classe `dark` sur `<html>` et `color-scheme` natif.
 *
 * @param dark - `true` pour le thème sombre, `false` pour le thème clair
 */
function applyTheme(dark: boolean) {
  isDark.value = dark

  const root = document.documentElement
  root.classList.toggle(DARK_CLASS, dark)
  root.style.colorScheme = dark ? 'dark' : 'light'
}

/** Bascule entre le thème clair et le thème sombre, puis mémorise le choix. */
function toggleTheme() {
  applyTheme(!isDark.value)

  try {
    localStorage.setItem(THEME_STORAGE_KEY, isDark.value ? 'dark' : 'light')
  } catch {
    // Stockage indisponible (navigation privée, quota…) : le thème reste appliqué.
  }
}

/*************************************************************************/
// Cycle de vie

onMounted(() => {
  let stored: string | null = null

  try {
    stored = localStorage.getItem(THEME_STORAGE_KEY)
  } catch {
    // Stockage indisponible : on se rabat sur la classe existante puis le système.
  }

  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const initialDark = stored
    ? stored === 'dark'
    : document.documentElement.classList.contains(DARK_CLASS) || systemPrefersDark

  applyTheme(initialDark)
})
</script>
