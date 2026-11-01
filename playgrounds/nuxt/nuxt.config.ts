// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: ['nuxt-jobi-ui', '@nuxt/icon/module'],
  css: ['~/assets/css/theme.css'],
  devtools: { enabled: true },
  compatibilityDate: 'latest',

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
      ]
    }
  },
})
