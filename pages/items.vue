<template>
  <lazy-list
    trigger="mounted"
    list-class="tw-grid tw-grid-cols-cards"
    :action="$modules.items.read"
    :placeholders="4"
    :infinite-scroll="true"
  >
    <template #item="item">
      <div>
        {{ item.title }}
      </div>
    </template>
  </lazy-list>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class ItemsPage extends Vue {}
</script>
