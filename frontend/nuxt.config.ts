// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  compatibilityDate: '2024-04-03',
  app: {
    baseURL: "/stuwe1/frontend"
  },
  devServer: {
    port: 8888
  },
  css: [
    "~/assets/scss/style.scss",
  ],
  devtools: { enabled: true },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/abstracts/_variables.scss" as *;@use "~/assets/scss/abstracts/_mixins.scss" as *;'
        }
      }
    }
  }
})
