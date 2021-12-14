<template>
  <nav class="nav-bar">
    <div class="nav-bar-container">
      <div class="nav-bar-start">
        <h4 class="tw-hidden md:tw-inline-block tw-pb-0.5">
          {{ $t('hello') }}
        </h4>
        <ul class="nav-bar-group">
          <li v-for="link of links" :key="link.key">
            <nuxt-link :to="link.path" class="nav-bar-link">
              {{ link.label }}
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="nav-bar-group">
        <switch-theme />
        <switch-lang />
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { NavLink } from '~/models'

@Component
export default class NavigationBar extends Vue {
  get links(): NavLink[] {
    return [
      {
        key: 'sandbox',
        path: this.localePath({ name: 'index' }),
        label: this.$t('nav.sandbox') as string,
      },
      {
        key: 'docs',
        path: this.localePath({ name: 'docs' }),
        label: this.$t('nav.docs') as string,
      },
    ]
  }
}
</script>

<style lang="scss" scoped>
.nav-bar {
  @apply tw-flex-center-x tw-py-4 tw-sticky tw-top-0 tw-border-b tw-border-nav;
  &-container {
    @apply tw-container tw-flex-center-y tw-space-x-8;
  }
  &-group {
    @apply tw-flex-center-y tw-space-x-4 md:tw-space-x-6;
  }
  &-start {
    @apply tw-flex-center-y tw-space-x-8 tw-flex-1;
  }
  &-link {
    &.active-exact {
      @apply tw-link;
    }
  }
}
</style>
