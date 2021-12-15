<template>
  <div class="app">
    <navigation-bar />
    <nuxt v-if="$nuxt.isOnline" class="app-page" />
    <error-content
      v-else
      :title="$t('errors.titles.noConnection')"
      :details="$t('errors.details.noConnection')"
    />
  </div>
</template>

<script lang="ts">
import '~/assets/scss/tailwind.scss'
import '~/assets/scss/global/_index.scss'

import { Vue, Component } from 'nuxt-property-decorator'
import { title } from '~/package.json'

@Component({
  head(this: DefaultLayout): any {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    const pageName = this.getRouteBaseName()
    const id = this.$route.params.id
    const pageTitle = this.$te(`meta.${pageName}.title`)
      ? this.$t(`meta.${pageName}.title`, { id }) as string
      : ''
    return {
      ...i18nHead,
      title: `${pageTitle ? `${pageTitle} - ` : ''}${title}`,
      meta: [
        ...i18nHead.meta,
        {
          hid: 'description',
          name: 'description',
          content: this.$t(`meta.${pageName}.description`, { id }),
        },
      ],
    }
  },
})
export default class DefaultLayout extends Vue {}
</script>

<style lang="scss">
html {
  font-size: 16px; // 1rem
  @apply tw-font-sans tw-bg-base tw-text-base;
}
</style>

<style lang="scss" scoped>
.app {
  @apply tw-flex tw-flex-col tw-min-h-screen;
  &-page {
    @apply tw-flex-1;
  }
}
</style>
