<template>
  <div class="switcher">
    <nuxt-link
      v-for="locale of localeCodes"
      :key="locale"
      class="switcher-link"
      :to="switchLocalePath(locale)"
    >
      {{ locale }}
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { LocaleObject } from '@nuxtjs/i18n'
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class LangSwitcher extends Vue {
  get localeCodes(): string[] {
    return (this.$i18n.locales as LocaleObject[]).map(l => l.code)
  }
}
</script>

<style lang="scss" scoped>
.switcher {
  @apply tw-space-x-2;
  &-link {
    @apply tw-uppercase;
    &.active-exact {
      @apply tw-text-accent;
    }
  }
}
</style>
