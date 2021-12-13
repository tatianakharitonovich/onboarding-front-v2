import { Plugin } from '@nuxt/types'
import { Services, makeServices } from '~/services'

declare module 'vuex-module-decorators' {
  interface VuexModule {
    $services: Services
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $services: Services
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $services: Services
  }

  interface Context {
    $services: Services
  }
}

declare module 'vuex/types/index' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $services: Services
  }
}

const servicesInjector: Plugin = (ctx, inject) => {
  inject('services', makeServices(ctx))
}

export default servicesInjector
