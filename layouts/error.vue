<template>
  <error-content
    :header="notFound ? 404 : ''"
    :title="$t(`errors.${type}.title`)"
    :details="$t(`errors.${type}.description`)"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { title } from '@/package.json'

@Component({
  name: 'error',
  head(this: ErrorLayout): any {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return {
      ...i18nHead,
      title: `${this.error.statusCode} - ${title}`,
      meta: [
        ...i18nHead.meta,
        {
          hid: 'description',
          name: 'description',
          content: title,
        },
      ],
    }
  },
})
export default class ErrorLayout extends Vue {
  @Prop({ type: Object, default: () => ({}) }) readonly error!: any

  get notFound(): boolean {
    return this.error.statusCode === 404
  }

  get type() {
    return this.notFound ? 'notFound' : 'default'
  }
}
</script>
