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
    :class="computedClasses"
    @click="handleClick"
  >
    <component :is="iconComponent()" v-if="icon && iconComponent()" v-bind="iconProps()" />
    <span v-if="text" class="truncate">
      {{ text }}
    </span>
  </component>
</template>

<script setup lang="ts">
import { useButtonClasses } from './use-button-classes'
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

const computedClasses = useButtonClasses({
  text: props.text,
  icon: props.icon,
  variant: props.variant,
  size: props.size,
  iconPosition: props.iconPosition,
  width: props.width,
  disabled: props.disabled ?? false,
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
