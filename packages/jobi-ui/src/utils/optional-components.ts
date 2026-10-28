import { getCurrentInstance, type Component } from 'vue'

/**
 * Resolve a component that may have been registered globally by the host
 * application (e.g. Nuxt's `NuxtLink` or `@nuxt/icon`'s `Icon`).
 *
 * Unlike `resolveComponent`, this returns `null` instead of warning when the
 * component is not available, which is required since this library must work
 * with or without those optional dependencies.
 */
export function resolveGlobalComponent(name: string): Component | null {
  const instance = getCurrentInstance()
  return (instance?.appContext.components[name] as Component | undefined) ?? null
}
