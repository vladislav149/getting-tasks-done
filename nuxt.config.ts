import {vuetifyOptions} from './vuetify.config'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: {enabled: true},

  future: {
    compatibilityVersion: 4,
  },

  devServer: {
    port: 3333,
  },

  vuetify: {
    vuetifyOptions,
  },

  modules: ['vuetify-nuxt-module', 'nuxt-typed-router'],
  app: {
    pageTransition: {name: 'page', mode: 'out-in'},
    baseURL: '/getting-tasks-done/',
  },
  ssr: false,

  runtimeConfig: {
    public: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    },
  },

  // router: {
  //   options: {

  //   }
  // },
})
