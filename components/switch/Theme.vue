<template>
  <div
    class="theme-toggle"
    :class="`theme-toggle-${strictCurrentTheme}`"
    :title="$t(`themeSwitcher.${nextTheme}`)"
    @click="currentTheme = nextTheme"
  >
    <div class="icon-area">
      <div class="moon-area">
        <div class="moon-area-vector" />
      </div>
      <div class="sun-rays">
        <div v-for="i of 4" :key="i" class="sun-rays-group">
          <div v-for="j of 2" :key="j" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { defaultTheme } from '~/nuxt.config'

const themes = ['light', 'dark'] as const
type Theme = typeof themes[number]

@Component
export default class ThemeSwitcher extends Vue {
  readonly themeOptions = themes

  get currentTheme(): string {
    return this.$colorMode.preference
  }

  set currentTheme(value: string) {
    this.$colorMode.preference = value
  }

  get strictCurrentTheme(): Theme {
    return (
      this.themeOptions.includes(this.currentTheme as Theme)
        ? this.currentTheme
        : defaultTheme
    ) as Theme
  }

  get nextTheme(): Theme {
    const currentOptionIndex = this.themeOptions.indexOf(
      this.strictCurrentTheme,
    )
    const newOptionIndex = (currentOptionIndex + 1) % this.themeOptions.length
    return this.themeOptions[newOptionIndex]
  }
}
</script>

<style lang="scss" scoped>
@use "sass:math";

.theme-toggle {
  @include circle(2.5rem);
  @apply tw-cursor-pointer tw-duration-300 hover:tw-transition-none;
  @apply tw-b tw-border-theme-switcher;
  &,
  .icon-area {
    @apply tw-flex tw-justify-center tw-items-center;
  }
  .icon-area {
    @apply tw-relative;
  }
  .moon-area,
  .moon-area-vector,
  .sun-rays {
    @apply tw-duration-300;
  }
  $innerSize: 0.675rem;
  $size: 1rem;
  .moon-area {
    $shift: 0.25rem;
    $initInnerSize: $innerSize + $shift;
    @keyframes appear {
      0% {
        @include circle($initInnerSize);
      }
      100% {
        @include circle($innerSize);
      }
    }
    @include circle($size);
    @apply tw-overflow-hidden tw-flex-center-y tw-relative;
    &-vector {
      @apply tw-origin-center tw-absolute;
      right: -$shift * 0.5;
      box-shadow: 0 0 0 $size rgb(var(--c-theme-switcher-bg));
      animation: appear 0.3s forwards;
    }
  }

  .sun-rays {
    @include set-size($size);
    @apply tw-opacity-0 tw-justify-center tw-items-center;
    &,
    &-group {
      @apply tw-absolute tw-flex;
    }
    &-group {
      @apply tw-flex tw-justify-between tw-h-px tw-w-full;
      $rays: 8;
      $dirs: $rays * 0.5;
      $step: math.div(360deg, $rays);
      @for $i from 1 through $dirs {
        &:nth-child(#{$i}) {
          transform: rotate(#{($i - 1) * $step});
        }
      }
      & > * {
        @apply tw-duration-300 tw-bg-theme-switcher tw-w-0.5;
        // @include set-width($b-xs);
      }
    }
  }
  &-light {
    .moon-area {
      transform: scale(0.9);
      &-vector {
        right: -$innerSize;
      }
    }
    .sun-rays {
      @apply tw-opacity-100;
      transform: scale(1.5) rotate(45deg);
    }
  }
  &:hover {
    @apply tw-border-theme-switcher-hover;
    .moon-area-vector {
      box-shadow: 0 0 0 $size rgb(var(--c-theme-switcher-bg-hover));
    }
    .sun-rays-group > * {
      @apply tw-bg-theme-switcher-hover;
    }
  }
}
</style>
