export function _link(value?: string, secure = true) {
  return value ? (value?.match(/^http(s?):\/\//g) ? '' : `http${secure ? 's' : ''}://`) + value : ''
}

export function _fill(value: string | number, len = 2, filler = '0', after = false) {
  let res = value.toString()
  if (res.length < len) {
    for (let i = 0; i < len - res.length; i++) {
      res = after ? `${res}${filler}` : `${filler}${res}`
    }
  }
  return res
}

export function _localeString(value: number | string, locale: string) {
  const label = typeof value === 'string' ? parseFloat(value) : value
  return label.toLocaleString(locale)
}

export function _date(value: string | Date, locale: string, time?: boolean) {
  let res = ''
  const date = typeof value === 'string' ? new Date(value) : value
  if (date) {
    let processor = time ? Date.prototype.toLocaleString : Date.prototype.toLocaleDateString
    processor = processor.bind(date)
    try {
      res = processor(locale, {
        dateStyle: 'short',
        timeStyle: 'short',
      })
    } catch (e) {
      res = processor(locale)
    }
  }
  return res
}

export function _time(value: string | Date, locale: string, seconds?: boolean): string {
  const date = typeof value === 'string' ? new Date(value) : value
  return date
    ? date.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
      second: seconds ? '2-digit' : undefined,
    })
    : ''
}
