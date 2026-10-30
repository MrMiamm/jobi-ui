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
        { label: `${variant} · hover animation + noise`, variant, hoverAnimation: true, noise: true },
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
</script>
