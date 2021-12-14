<template>
  <section class="section">
    {{ $t('hello') }}
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class HomePage extends Vue {
  async mounted() {
    const items = (await this.$modules.items.read()).data?.results || []
    console.log(items)
    console.log((await this.$modules.collections.get({ id: items[0].collections[0].id })).data)
  }
}
</script>
