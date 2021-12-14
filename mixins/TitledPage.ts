import { Component, Vue } from 'nuxt-property-decorator'
import { MetaInfo } from 'vue-meta'
import { title } from '@/package.json'

@Component({
  head(this: TitledPage): any {
    const i18nHead: MetaInfo = (this as any).$nuxtI18nHead({ addSeoAttributes: true })
    const dataTitle = this.data?.title
    return {
      ...i18nHead,
      title: dataTitle ? `${dataTitle} - ${title}` : i18nHead.title,
    }
  },
})
export class TitledPage<TData extends { title: string } = any> extends Vue {
  data?: TData | null
}
