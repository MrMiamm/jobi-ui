<template>
  <div
    class="flex flex-col gap-4 border-2 rounded-xl bg-linear-90 py-8 px-6"
    :class="{
      'jobi-card--noise': noise,
      'shadow-md': shadow,

      'hover:shadow-xl transition-all ease-linear duration-500': hoverAnimation,

      'border-primary-400/30 from-primary-400/20 to-primary-700/20': variant === 'primary',
      'hover:border-primary-400/30 hover:bg-primary-400/30': variant === 'primary' && hoverAnimation,

      'border-secondary-400/30 from-secondary-400/20 to-secondary-700/20': variant === 'secondary',
      'hover:border-secondary-400/30 hover:bg-secondary-400/30': variant === 'secondary' && hoverAnimation,

      'border-dark/10 from-light/20 to-primary-50/20': variant === 'contrast',
      'hover:border-dark/65 hover:bg-primary-50/50': (variant === 'contrast' || variant === 'ghost') && hoverAnimation,

      'border-transparent from-light/0 to-primary-50/0': variant === 'ghost',
    }"
  >
    <header>
      <slot name="header" />
    </header>
    <div class="grow">
      <slot />
    </div>
    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>

<script lang="ts" setup>
import type { CardProps } from './card.types'

/*************************************************************************/
// Props

withDefaults(defineProps<CardProps>(), {
  noise: false,
  hoverAnimation: false,
  shadow: false,
  variant: 'primary',
})
</script>
