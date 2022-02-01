<template>
  <section class="page">
    <div class="tw-container">
      <div class="error-body">
        <h1 class="error-body-title">
          {{ title }}
        </h1>
        <p class="error-body-description">
          {{ details }}
        </p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class ErrorContent extends Vue {
  @Prop() readonly title!: string
  @Prop() readonly details!: string
  @Prop() readonly header?: string
}
</script>

<style lang="scss">
@use 'sass:math';
.page {
  @apply tw-flex-1 md:tw-items-center tw-py-20 tw-flex-center-x;
}
.error {
  @apply tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-pb-6;
  @apply tw-space-y-10 tw-text-center tw-my-12;
  @screen sm { // sm+
    @apply tw-space-x-10 tw-space-y-0 tw-text-left tw-my-8;
  }
  @screen md { // md+
    @apply tw-my-0;
  }
  &-body {
    @apply tw-space-y-4 tw-flex-1;
    max-width: 100%;
    @screen sm {
      max-width: 32rem;
    }
    @screen md {
      @apply tw-pb-16;
    }
    &-description {
      @apply tw-text-lg tw-text-dim-1;
    }
    &-title {
      @apply tw-text-4xl;
      @screen xs {
        @apply tw-text-5xl;
      }
    }
  }
}
</style>
