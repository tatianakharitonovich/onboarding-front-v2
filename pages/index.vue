<template>
  <section class="tw-py-section">
    <div class="tw-container">
      <nuxt-content :document="greater" />
    </div>
    <hr class="tw-my-16 tw-text-dim-3">
    <div class="tw-container tw-py-12 tw-space-y-12">
      <h2>{{ $t('items.title') }}</h2>
      <lazy-list
        trigger="mounted"
        list-class="tw-grid tw-grid-cols-cards tw-gap-x-8 tw-gap-y-6"
        :action="$modules.items.read"
        :placeholders="4"
        :infinite-scroll="true"
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
}
</script>
