export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'wedevs',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/auth.css',
    '~/assets/css/user.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/global',
    '@/plugins/func',
    '@/plugins/vloading',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/toast',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    debug: false,
    baseURL: 'http://wedevs.job',
    headers: {
      common: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      delete: {},
      get: {},
      head: {},
      post: {},
      put: {},
      patch: {}
    },
    withCredentials: true,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  toast: {
    position: 'top-right',
    duration: 3000,
    action : {
      text : 'Close',
      onClick : (e, toastObject) => {
        toastObject.goAway(20);
      }
    },
    register: [ // Register custom toasts
      {
        name: 'saved',
        message: 'Data saved successfully',
        options: {
          type: 'success'
        }
      },
      {
        name: 'updated',
        message: 'Data updated successfully',
        options: {
          type: 'success'
        }
      },
      {
        name: 'unknownError',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
