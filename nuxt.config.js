export const defaultTheme = 'dark'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: false,

  store: false,

  loading: {
    color: 'rgb(var(--c-accent))',
    failedColor: '#FF392B',
    height: '2px',
  },
  loadingIndicator: '~/loading.html',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: require('./package.json').title || 'Onboarding',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Onboarding for new front-end developers in be7team. Vue, Nuxt, scss, tailwindcss and other technologies.' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'boxicons/css/boxicons.min.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/store.ts',
    '~plugins/services.ts',
    '~plugins/filters.ts',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://color-mode.nuxtjs.org
    '@nuxtjs/color-mode',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
    // https://i18n.nuxtjs.org
    '@nuxtjs/i18n',
  ],

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    apiPrefix: 'page',
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-one-dark.css',
      },
    },
  },

  // Buefy module configuration: https://github.com/buefy/nuxt-buefy#options
  buefy: {
    css: false,
    materialDesignIcons: false,
    defaultIconPack: 'bx',
    customIconPacks: {
      bx: {
        internalIcons: {
          'arrow-up': 'bx-up-arrow-alt',
          'chevron-left': 'bxs-chevron-left',
          'chevron-right': 'bxs-chevron-right',
          'eye': 'bx-show',
          'eye-off': 'bxs-hide',
          'alert-circle': 'bxs-error-circle',
        },
      },
    },
  },

  // StyleResources module setup: https://github.com/nuxt-community/style-resources-module#setup
  styleResources: {
    scss: './assets/scss/utils/*.scss',
    hoistUseStatements: true,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://picipo.be7team.com/api/v1/',
  },

  // I18n module configuration: https://i18n.nuxtjs.org/options-reference
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en-US.js',
      },
      {
        code: 'ru',
        iso: 'ru-RU',
        file: 'ru-RU.js',
      },
    ],
    seo: true,
    lazy: true,
    langDir: 'lang',
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
    },
    // String path is to resolve imports issue: https://github.com/nuxt-community/i18n-module/pull/605#issuecomment-644311878
    vueI18n: '~/i18n.config.js',
  },

  // ColorMode module setup: https://color-mode.nuxtjs.org/#setup
  colorMode: {
    preference: 'system',
    fallback: defaultTheme,
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storageKey: 'color-mode',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // Router Configuration: https://nuxtjs.org/docs/configuration-glossary/configuration-router
  router: {
    linkActiveClass: 'active',
    linkExactActiveClass: 'active-exact',
  },
}
