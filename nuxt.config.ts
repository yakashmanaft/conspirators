// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    'nuxt-auth-utils',
    'nuxt-icon',
    '@kevinmarrec/nuxt-pwa',
    '@nuxt/image',
    ["nuxt-mail", {
      message: {
        to: 'ya.kashmanaft@gmail.com'
      },
      smtp: {
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: 'ya.kashmanaft@gmail.com',
          pass: 'ukji ivny angq crwq'
        },
      },
    }]
  ],
  pwa: {
    workbox: {
      enabled: true
    }
    // https://www.npmjs.com/package/@kevinmarrec/nuxt-pwa
  },
  devtools: { enabled: true },
  // build: {
  //   transpile: ['NuxtExample']
  // }
  app: {
    head: {
      title: 'Conspirators',
      titleTemplate: "%s",
      charset: 'utf-8',
      viewport: 'user-scalable=no, width=device-width, initial-scale=1.0'
    }
  },
  css: [
    '@/assets/css/vanilla-calendar.min.css',
    '@/assets/css/colors.css',
    '@/assets/css/reset.css'
  ],
  // components: [
  //   {
  //     path: '~/components',
  //     pathPrefix: false,
  //   }, 
  // ],
  routeRules: {
    '/api/**': { cors: true }
  },
  runtimeConfig: {
    // sessionPassword: 'a69ada35922e90fd13b2953afc169bdda4243cfe61afbc0a550f9525a2f2c83d'
    public: {
      NUXT_SESSION_PASSWORD: process.env.NUXT_SESSION_PASSWORD
    }
  }
})