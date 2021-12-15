<template>
  <section class="tw-py-section">
    <div class="tw-container">
      <nuxt-content :document="docs" />
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
      docs: (await ctx.$content(ctx.i18n.locale, 'docs').fetch()) as FetchReturn,
    }
  },
})
export default class DocsPage extends Vue {
  docs?: FetchReturn
}
</script>
