<template>
  <div class="card">
    <div class="card-preview">
      <video
        v-if="data.file.isVideo"
        :playsinline="true"
        :autoplay="true"
        :loop="true"
        :muted="true"
      >
        <source :src="data.file.preview">
      </video>
      <img v-else :src="data.file.preview" :alt="data.title">
    </div>
    <div class="card-body">
      <div class="tw-h4">
        {{ data.title }}
      </div>
      <p class="card-description">
        {{ data.description }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { IItemModel } from '~/models'

@Component
export default class ItemCard extends Vue {
  @Prop() readonly data!: IItemModel
}
</script>

<style lang="scss" scoped>
.card {
  @apply tw-space-y-4;
  &-preview {
    @apply tw-rounded;
  }
  &-body {
    @apply tw-space-y-2;
  }
  &-description {
    @apply tw-text-base tw-text-sm;
  }
}
</style>
