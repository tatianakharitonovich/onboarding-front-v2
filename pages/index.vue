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
    console.log((await this.$modules.posts.read()).data)
    console.log((await this.$modules.comments.read({ parentId: 2 })).data)
  }
}
</script>
