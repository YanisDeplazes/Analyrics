// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  compatibilityDate: '2024-04-03',
  app: {
    baseURL: "/Analyrics",
    head: {
      link:
        [
          { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    }
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
  },
  runtimeConfig: {
    public: {
        frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000", 
        backendUrl: process.env.BACKEND_URL || "http://localhost:3000", 
    },
  },
})
