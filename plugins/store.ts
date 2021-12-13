import { Plugin } from '@nuxt/types'
import Vue from 'vue'
import Vuex from 'vuex'
import { Modules, makeStore } from '~/store'

declare module 'vuex-module-decorators' {
  interface VuexModule {
    $modules: Modules
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $modules: Modules
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $modules: Modules
  }

  interface Context {
    $modules: Modules
  }
}

declare module 'vuex/types/index' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $modules: Modules
  }
}

const storeInjector: Plugin = (ctx, inject) => {
  Vue.use(Vuex)
  inject('modules', makeStore(ctx) as Modules)
}

export default storeInjector
