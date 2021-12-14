import Vue from 'vue'
import { Plugin } from '@nuxt/types'
import {
  _capitalize,
  _link,
  _fill,
  _localeString,
  _date,
  _time,
} from '~/utils'

const filtersProvider: Plugin = ({ i18n: { locale } }) => {
  Vue.filter('capitalize', _capitalize)
  Vue.filter('complete', _fill)
  Vue.filter('link', _link)
  Vue.filter('localeString', (value: number | string): string => _localeString(value, locale))
  Vue.filter('date', (value: string | Date, time?: boolean) => _date(value, locale, time))
  Vue.filter('time', (value: string | Date, seconds?: boolean) => _time(value, locale, seconds))
}

export default filtersProvider
