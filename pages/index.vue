<template>
  <section class="tw-section">
    <div class="tw-container">
      <nuxt-content :document="greater" />
    </div>
    <hr class="tw-my-16 tw-text-dim-3">
    <div class="tw-container tw-py-12 tw-space-y-12">
      <div class="tw-space-y-1">
        <h2>{{ $t('items.title') }}</h2>
        <small v-if="showCounter" class="subtitle">{{ counter }}</small>
      </div>
      <lazy-list
        trigger="mounted"
        list-class="tw-grid tw-grid-cols-cards tw-gap-x-8 tw-gap-y-6"
        :action="$modules.items.read"
        :placeholders="4"
        :infinite-scroll="true"
        @update:count="loaded"
      >
        <template #item="item">
          <item-card :data="item" />
        </template>
      </lazy-list>
    </div>
  </section>
</template>

<script lang="ts">
import { FetchReturn } from '@nuxt/content/types/query-builder'
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  async asyncData(ctx: Context) {
    return {
      greater: (await ctx.$content(ctx.i18n.locale, 'hello').fetch()) as FetchReturn,
    }
  },
})
export default class HomePage extends Vue {
  greater?: FetchReturn
  itemsCounter: number | null = null

  get showCounter(): boolean {
    return typeof this.itemsCounter === 'number'
  }

  get counter(): string {
    return this.$tc('items.counter', this.itemsCounter || undefined) as string
  }

  loaded(count: number | null): void {
    this.itemsCounter = count
  }
}
</script>

<style lang="scss" scoped>
.subtitle {
  @apply tw-text-sm tw-text-dim-1;
}
</style>
