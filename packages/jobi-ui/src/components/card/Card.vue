<template>
  <div
    class="flex flex-col gap-4 border-2 rounded-xl bg-linear-90 py-8 px-6"
    :class="{
      'jobi-card--noise': noise,
      'jobi-card--shadow': shadow,
      'jobi-card--hover-animation': hoverAnimation,

      'jobi-card--primary': variant === 'primary',
      'jobi-card--secondary': variant === 'secondary',
      'jobi-card--contrast': variant === 'contrast',
      'jobi-card--ghost': variant === 'ghost',
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

<style>
@reference "../../assets/styles/theme.css";

/*Noise*/
.jobi-card--noise {
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cfilter id='grain' x='0' y='0' width='150' height='150' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.98' numOctaves='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncR type='linear' slope='1.8' intercept='-0.4'/%3E%3CfeFuncG type='linear' slope='1.8' intercept='-0.4'/%3E%3CfeFuncB type='linear' slope='1.8' intercept='-0.4'/%3E%3CfeFuncA type='linear' slope='0' intercept='0.16'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='150' height='150' filter='url(%23grain)'/%3E%3C/svg%3E"),
    linear-gradient(var(--tw-gradient-stops));
  background-blend-mode: soft-light, normal;
  background-size:
    150px 150px,
    100% 100%;
  background-clip: padding-box, border-box;
}

/*Shadow*/
.jobi-card--shadow {
  @apply shadow-md
}

/*Hover animation*/
.jobi-card--hover-animation {
  @apply hover:shadow-xl transition-all ease-linear duration-500
}

/*Primary*/
.jobi-card--primary {
  @apply border-primary-400/30 from-primary-400/20 to-primary-700/20 dark:border-primary-400/30 dark:from-primary-400/60 dark:to-primary-700/60
}

/*Primary animation*/
.jobi-card--primary.jobi-card--hover-animation {
  @apply hover:border-primary-400/30 hover:bg-primary-400/30 dark:hover:border-primary-400/60 dark:hover:bg-primary-600/60
}

/*Secondary*/
.jobi-card--secondary {
  @apply border-secondary-400/30 from-secondary-400/20 to-secondary-700/20 dark:border-secondary-400/30 dark:from-secondary-400/60 dark:to-secondary-700/60
}

/*Secondary animation*/
.jobi-card--secondary.jobi-card--hover-animation {
  @apply hover:border-secondary-400/30 hover:bg-secondary-400/30 dark:hover:border-secondary-400/60 dark:hover:bg-secondary-600/60
}

/*Contrast*/
.jobi-card--contrast {
  @apply border-dark/10 from-light/20 to-primary-50/20 dark:border-light/10
}

/*Ghost*/
.jobi-card--ghost {
  @apply border-transparent from-light/0 to-primary-50/0
}

/*Contrast & Ghost animation*/
.jobi-card--contrast.jobi-card--hover-animation,
.jobi-card--ghost.jobi-card--hover-animation {
  @apply hover:border-dark/65 hover:bg-primary-50/50 dark:hover:border-light/10 dark:hover:bg-light/10
}
</style>
