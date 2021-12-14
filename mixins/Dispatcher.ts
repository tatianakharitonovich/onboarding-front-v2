import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { ReadData, ReadParams, ApiResponse } from '~/services'

type ItemValue = any

@Component
export class DispatcherMixin extends Vue {
  private cancelRequest?: () => void

  @Prop() readonly params?: ReadParams
  @Prop() readonly action!: (params?: ReadParams) => ApiResponse<ReadData>
  @Prop({ default: false }) readonly reloadOnParamsChange!: boolean

  items: ItemValue[] | null = null
  loading = false
  nextPage: number | null = null
  count: number | null = null

  get receivedAllItems(): boolean {
    return !(
      !this.count
      || (!!this.items && !!this.count && this.items.length < this.count)
    )
  }

  async dispatchAction(
    searchParams?: ReadParams,
    replace?: boolean,
  ): Promise<void> {
    this.loading = !replace && true
    const CancellationToken = this.$axios.CancelToken
    const responseData: ReadData | undefined = (
      await this.action({
        ...this.params,
        ...(searchParams || {}),
        page: this.nextPage || 1,
        cancelToken: new CancellationToken((c) => {
          this.cancelRequest = c
        }),
      })
    )?.data
    this.nextPage = responseData?.next || null
    this.loading = false
    this.cancelRequest = undefined
    const newItems = responseData?.results || []
    this.count = responseData?.count || null
    this.items = [...(this.items && !replace ? this.items : []), ...newItems]
  }

  reset(loading = false, soft = false): void {
    !soft && (this.items = null)
    this.loading = loading
    this.nextPage = null
    this.count = null
  }

  async refresh(): Promise<void> {
    this.reset()
    await this.dispatchAction(this.params)
  }

  @Watch('params')
  async onParamsChange(): Promise<void> {
    if (this.reloadOnParamsChange) {
      this.cancelRequest && this.cancelRequest()
      await this.refresh()
    }
  }

  @Watch('items', { deep: true })
  onItemsChange(value: ItemValue[] | null): void {
    this.$emit('update', value)
  }
}
