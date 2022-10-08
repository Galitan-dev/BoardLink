import { resolve } from 'path';
import env from './.nest/environment';
import backend from './.nest/server/nest';

export default async () => ({
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'BoardLink',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  srcDir: 'client/',

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['assets/css/main.less'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~plugins/socket.io', mode: 'client' }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  router: {
    extendRoutes(routes, resolve) {
      const ControllerComponent = resolve(
        __dirname,
        'client/pages/controller/index.vue'
      );

      routes.push(
        {
          path: '/controller/:linkId',
          component: ControllerComponent
        },
        {
          path: '/c/:linkId',
          component: ControllerComponent
        },
        {
          path: '/controller',
          component: ControllerComponent
        },
        {
          path: '/c',
          component: ControllerComponent
        }
      );
    }
  },

  alias: {
    plugins: resolve(__dirname, './client/plugins'),
    components: resolve(__dirname, './client/components'),
    env: resolve(__dirname, './environment'),
    assets: resolve(__dirname, './client/assets')
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    'cookie-universal-nuxt'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  ...(await env.nuxtConfig(backend))
});
