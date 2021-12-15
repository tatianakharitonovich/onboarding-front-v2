<template>
  <div ref="container">
    <transition name="fade-sm" mode="out-in">
      <div v-if="processedItems" key="loaded">
        <transition name="fade" mode="out-in">
          <div v-if="processedItems.length" key="items" :class="containerClass">
            <div
              class="lazy-list-items"
              :class="[{ 'tw-h-full': infiniteScroll }, listClass]"
            >
              <div v-for="item of processedItems" :key="item.id">
                <slot name="item" v-bind="item" />
              </div>
            </div>
            <div v-if="infiniteScroll && loading" class="scroll-loader">
              <slot name="scroll-loading">
                {{ $t('loading') }}
              </slot>
            </div>
          </div>
          <div v-else key="empty">
            <slot name="empty" />
          </div>
        </transition>
      </div>
      <div v-else key="loading" :class="containerClass">
        <div class="lazy-list-items lazy-list-loading" :class="listClass">
          <slot name="loading">
            <div v-for="index in placeholders" :key="index">
              <slot name="skeleton" />
            </div>
          </slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref } from 'nuxt-property-decorator'
import { DispatcherMixin } from '~/mixins'

@Component
export default class LazyList extends DispatcherMixin {
  @Prop({ default: 4 }) readonly placeholders!: number
  @Prop({ validator: (value: number) => value > 0 }) readonly renewInterval?: number
  @Prop() readonly processor?: (items: any[] | null) => any[] | null

  @Prop() readonly listClass?: string | object | any[]
  @Prop() readonly containerClass?: string | object | any[]

  @Prop({ default: false }) readonly infiniteScroll!: boolean
  @Prop() readonly scrollTarget?: HTMLElement
  @Ref() readonly container!: HTMLElement

  renewTimer: null | NodeJS.Timer = null

  async dispatch(soft?: boolean): Promise<void> {
    await this.dispatchAction(undefined, soft)
    // dispatch for next page if there's sill no scroll overflow
    this.infiniteScroll && this.loadNextPage()
  }

  get processedItems(): any[] | null {
    return this.processor?.call(null, this.items) || this.items
  }

  get canReadNextPage(): boolean {
    return !this.loading && !!this.nextPage && !this.receivedAllItems
  }

  get scrollArea(): HTMLElement | Window {
    return this.scrollTarget || window
  }

  checkScrollEnded(): boolean {
    const margin = 50
    const bottom = this.container?.getBoundingClientRect().bottom
    if (bottom) {
      if (this.scrollTarget) {
        // check bottoms' of the list and scroll-area matching
        const containerBottom = this.scrollTarget.getBoundingClientRect().bottom
        return bottom - containerBottom < margin
      } else {
        // check bottoms' of the list and window matching
        return bottom < window.innerHeight - margin
      }
    } else {
      return false
    }
  }

  loadNextPage(): void {
    if (this.canReadNextPage) {
      this.checkScrollEnded() && this.dispatch()
    }
  }

  fetch(): void {
    !this.items && this.dispatch()
    this.infiniteScroll
      && this.scrollArea.addEventListener('scroll', this.loadNextPage)
    this.setIntervalTimer()
  }

  private setIntervalTimer() {
    if (this.renewInterval) {
      this.renewTimer = setInterval(() => {
        this.reset(false, true) // not just refresh, call scroll-related `dispatch`
        this.dispatch(true)
      }, this.renewInterval)
    }
  }

  private resetIntervalTimer() {
    !!this.renewTimer && clearInterval(this.renewTimer)
  }

  beforeDestroy() {
    this.resetIntervalTimer()
  }

  deactivated() {
    this.resetIntervalTimer()
  }
}
</script>

<style lang="scss" scoped>
.scroll-loader {
  @apply tw-flex-center-x;
}
</style>
