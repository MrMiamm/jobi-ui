<template>
  <main
    class="flex min-h-screen flex-col items-start gap-6 bg-light dark:bg-dark p-8 text-dark dark:text-light"
  >
    <NuxtRouteAnnouncer />

    <div class="flex w-full items-center justify-between gap-4">
      <h1 class="text-2xl font-bold text-primary-700 dark:text-primary-200">
        Jobi UI - Playground Nuxt
      </h1>
      <JobiThemeSwitcher />
    </div>

    <h2 class="text-xl font-bold text-primary-700 dark:text-primary-200">Couleurs</h2>

    <div
      v-for="group in colorGroups"
      :key="group.label"
      class="flex w-full max-w-6xl flex-col gap-3"
    >
      <h3 class="text-lg font-semibold text-primary-700 dark:text-primary-200">
        {{ group.label }}
      </h3>
      <div class="grid w-full gap-4" :class="group.gridClass">
        <div
          v-for="color in group.colors"
          :key="color.label"
          class="rounded-md border border-dark/10 p-4 dark:border-light/10"
          :class="color.className"
        >
          <p class="font-bold">{{ color.label }}</p>
          <p class="text-sm">{{ color.text }}</p>
        </div>
      </div>
    </div>

    <h2 class="text-xl font-bold text-primary-700 dark:text-primary-200">Buttons</h2>

    <div class="grid w-full max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-5">
      <div v-for="b in buttonCases" :key="b.label" class="flex flex-col gap-2 items-start">
        <p class="text-sm font-light text-dark/70 dark:text-light/70">{{ b.label }}</p>
        <JobiButton
          text="Button"
          :variant="b.variant"
          :noise="b.noise"
          :icon="b.icon"
          :icon-position="b.iconPosition"
          :size="b.size"
        />
      </div>
    </div>

    <h2 class="text-xl font-bold text-primary-700 dark:text-primary-200">Cards</h2>

    <div class="grid w-full max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-4">
      <div v-for="cardCase in cardCases" :key="cardCase.label" class="flex flex-col gap-2">
        <p class="text-sm font-light text-dark/70 dark:text-light/70">{{ cardCase.label }}</p>
        <JobiCard
          :variant="cardCase.variant"
          :noise="cardCase.noise"
          :shadow="cardCase.shadow"
          :hover-animation="cardCase.hoverAnimation"
        >
          <template #header> Header </template>
          Content
          <template #footer> Footer </template>
        </JobiCard>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import type { ButtonProps } from '../../../packages/jobi-ui/src/components/button/button.types'
import type { CardProps } from '../../../packages/jobi-ui/src/components/card/card.types'

interface Label {
  label: string
}

const variants = ['primary', 'secondary', 'contrast', 'ghost'] as const
const sizes = ['sm', 'md', 'xl'] as const

type ButtonCase = ButtonProps & Label

const buttonCases: ButtonCase[] = sizes.flatMap((size) =>
  variants.flatMap(
    (variant) =>
      [
        { label: `${size} · ${variant} · classic`, variant, size },
        { label: `${size} · ${variant} · noise`, variant, size, noise: true },
        {
          label: `${size} · ${variant} · icon left`,
          variant,
          size,
          icon: 'material-symbols:keyboard-backspace',
          iconPosition: 'left',
        },
        {
          label: `${size} · ${variant} · icon right`,
          variant,
          size,
          icon: 'material-symbols:keyboard-backspace',
          iconPosition: 'right',
        },
        {
          label: `${size} · ${variant} · icon + noise`,
          variant,
          size,
          noise: true,
          icon: 'material-symbols:keyboard-backspace',
        },
      ] satisfies ButtonCase[],
  ),
)

/*************************************************************************/
// Tous les cas de la carte : chaque variante, avec et sans noise,
// puis les options (ombre portée, animation au survol) et leur cumul.

type CardCase = CardProps & Label

const cardCases: CardCase[] = [
  ...variants.flatMap(
    (variant) =>
      [
        { label: `${variant} · sans noise`, variant },
        { label: `${variant} · noise`, variant, noise: true },
        { label: `${variant} · hover animation`, variant, hoverAnimation: true },
        {
          label: `${variant} · hover animation + noise`,
          variant,
          hoverAnimation: true,
          noise: true,
        },
      ] satisfies CardCase[],
  ),
  {
    label: 'primary · all',
    variant: 'primary',
    noise: true,
    shadow: true,
    hoverAnimation: true,
  },
]

/*************************************************************************/
// Toutes les nuances de couleur en fond, avec le texte adapté à chaque
// fond. Les classes restent littérales pour que Tailwind les détecte.

type ColorCase = Label & {
  text: string
  className: string
}

const primaryShades = [
  [50, 'bg-primary-50 text-on-primary-50'],
  [100, 'bg-primary-100 text-on-primary-100'],
  [200, 'bg-primary-200 text-on-primary-200'],
  [300, 'bg-primary-300 text-on-primary-300'],
  [400, 'bg-primary-400 text-on-primary-400'],
  [500, 'bg-primary-500 text-on-primary-500'],
  [600, 'bg-primary-600 text-on-primary-600'],
  [700, 'bg-primary-700 text-on-primary-700'],
  [800, 'bg-primary-800 text-on-primary-800'],
  [900, 'bg-primary-900 text-on-primary-900'],
  [950, 'bg-primary-950 text-on-primary-950'],
] as const

const secondaryShades = [
  [50, 'bg-secondary-50 text-on-secondary-50'],
  [100, 'bg-secondary-100 text-on-secondary-100'],
  [200, 'bg-secondary-200 text-on-secondary-200'],
  [300, 'bg-secondary-300 text-on-secondary-300'],
  [400, 'bg-secondary-400 text-on-secondary-400'],
  [500, 'bg-secondary-500 text-on-secondary-500'],
  [600, 'bg-secondary-600 text-on-secondary-600'],
  [700, 'bg-secondary-700 text-on-secondary-700'],
  [800, 'bg-secondary-800 text-on-secondary-800'],
  [900, 'bg-secondary-900 text-on-secondary-900'],
  [950, 'bg-secondary-950 text-on-secondary-950'],
] as const

/**
 * Construit les pastilles d'une famille de couleurs.
 * @param name Nom de la famille.
 * @param shades Nuances et classes de fond/texte associées.
 */
function toColorCases(
  name: 'primary' | 'secondary',
  shades: readonly (readonly [number, string])[],
): ColorCase[] {
  return shades.map(([shade, className]) => ({
    label: `${name}-${shade}`,
    text: `text-on-${name}-${shade}`,
    className,
  }))
}

const baseColors: ColorCase[] = [
  { label: 'primary', text: 'text-on-primary', className: 'bg-primary text-on-primary' },
  { label: 'secondary', text: 'text-on-secondary', className: 'bg-secondary text-on-secondary' },
  { label: 'light', text: 'text-dark', className: 'bg-light text-dark' },
  { label: 'dark', text: 'text-light', className: 'bg-dark text-light' },
]

type ColorGroup = Label & {
  gridClass: string
  colors: ColorCase[]
}

const colorGroups: ColorGroup[] = [
  {
    label: 'Primary',
    gridClass: 'sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6',
    colors: toColorCases('primary', primaryShades),
  },
  {
    label: 'Secondary',
    gridClass: 'sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6',
    colors: toColorCases('secondary', secondaryShades),
  },
  {
    label: 'Base',
    gridClass: 'sm:grid-cols-2 md:grid-cols-4',
    colors: baseColors,
  },
]
</script>
