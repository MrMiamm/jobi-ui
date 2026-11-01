<template>
  <component
    :is="componentTag"
    v-bind="componentProps"
    :aria-disabled="isLink && disabled ? 'true' : undefined"
    :tabindex="isLink && disabled ? -1 : undefined"
    class="
      flex gap-1 items-center cursor-pointer border-2
      active:shadow-2xl active:translate-y-0.5
      hover:shadow-sm font-light rounded-md
      transition-all duration-300 ease-linear
    "
    :class="{
      'w-fit': width === 'fit' && text,
      'w-full': width === 'full' && text,

      'justify-center': !text && icon,
      'w-7 h-7 p-0': !text && icon && size === 'sm',
      'w-11 h-11 p-1': !text && icon && size === 'md',
      'w-15 h-15 p-2': !text && icon && size === 'xl',

      'py-0 px-1.5': text && size === 'sm',
      'py-1 px-4': text && size === 'md',
      'py-2 px-6': text && size === 'xl',

      'flex-row': iconPosition === 'left',
      'flex-row-reverse': iconPosition === 'right',

      'jobi-button--primary': variant === 'primary',
      'jobi-button--secondary': variant === 'secondary',
      'jobi-button--info': variant === 'info',
      'jobi-button--danger': variant === 'danger',
      'jobi-button--warning': variant === 'warning',
      'jobi-button--success': variant === 'success',
      'jobi-button--contrast': variant === 'contrast',
      'jobi-button--ghost': variant === 'ghost',

      'text-sm': size === 'sm',
      'text-base': size === 'md',
      'text-xl': size === 'xl',

      'jobi-button--disabled': disabled,
      'jobi--noise': noise,
    }"
    @click="handleClick"
  >
    <component :is="iconComponent()" v-if="icon && iconComponent()" v-bind="iconProps()" />
    <span v-if="text" class="truncate">
      {{ text }}
    </span>
  </component>
</template>

<script setup lang="ts">
import { useButtonIcon } from './use-button-icon'
import { useButtonLink } from './use-button-link'
import type { ButtonProps } from './button.types'

/*************************************************************************/
// Props

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  width: 'fit',
  iconPosition: 'left',
  type: 'button',
  noise: false,
})

/*************************************************************************/
// Emits

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

/*************************************************************************/
// Const / Var

const { isLink, componentTag, componentProps } = useButtonLink({
  to: () => props.to,
  type: () => props.type,
  disabled: () => props.disabled,
})

const { iconComponent, iconProps } = useButtonIcon(() => props.icon)

/*************************************************************************/
// Fonctions

/**
 * Gère le clic sur le composant.
 * Empêche l'action si le bouton est désactivé et émet l'événement `click`.
 *
 * @param event - Événement souris natif
 */
function handleClick(event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault()
    event.stopPropagation()
    return
  }

  emit('click', event)
}
</script>

<style>
@reference "../../assets/styles/theme.css";

/*Disabled*/
.jobi-button--disabled {
  @apply opacity-50 pointer-events-none;
}

/*Primary*/
.jobi-button--primary {
  @apply bg-primary-500 border-primary-400 text-on-primary-500 dark:bg-primary-400 dark:text-on-primary-400 hover:bg-primary-600 hover:dark:bg-primary-300;
}

/*Secondary*/
.jobi-button--secondary {
  @apply bg-secondary-500 border-secondary-400 text-on-secondary-500 dark:bg-secondary-400 dark:text-on-secondary-400 hover:bg-secondary-700 hover:dark:bg-secondary-200;
}

/*Info*/
.jobi-button--info {
  @apply bg-info-500 border-info-400 text-on-info-500 dark:bg-info-400 dark:text-on-info-400 hover:bg-info-600 hover:text-on-info-600 hover:dark:bg-info-300 hover:dark:text-on-info-300;
}

/*Danger*/
.jobi-button--danger {
  @apply bg-danger-500 border-danger-400 text-on-danger-500 dark:bg-danger-400 dark:text-on-danger-400 hover:bg-danger-600 hover:text-on-danger-600 hover:dark:bg-danger-300 hover:dark:text-on-danger-300;
}

/*Warning*/
.jobi-button--warning {
  @apply bg-warning-500 border-warning-400 text-on-warning-500 dark:bg-warning-400 dark:text-on-warning-400 hover:bg-warning-600 hover:text-on-warning-600 hover:dark:bg-warning-300 hover:dark:text-on-warning-300;
}

/*Success*/
.jobi-button--success {
  @apply bg-success-500 border-success-400 text-on-success-500 dark:bg-success-400 dark:text-on-success-400 hover:bg-success-600 hover:text-on-success-600 hover:dark:bg-success-300 hover:dark:text-on-success-300;
}

/*Contrast*/
.jobi-button--contrast {
  @apply bg-light text-dark/85 border-dark/65 dark:bg-dark dark:text-light/85 dark:border-light/65 hover:bg-dark/10 hover:dark:bg-light/10;
}

.jobi-button--contrast.jobi--noise {
  @apply hover:dark:bg-dark/80!;
}

/*Ghost*/
.jobi-button--ghost {
  @apply border-transparent hover:border-dark/5 hover:dark:border-light/5 hover:dark:shadow-primary/10 hover:dark:shadow-md hover:dark:active:shadow-primary hover:dark:active:shadow-2xl;
}
.jobi-button--ghost.jobi--noise {
  background-image: none;
}
</style>
