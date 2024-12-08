import dayjs from 'dayjs'
import store from '@/store'
import rt from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import { dateFormat } from '@/utils/tools'

// 加载相对时间插件
dayjs.extend(rt)
function relativeTime(val) {
  const _val = val && parseInt(val)
  return (
    (_val &&
      dayjs()
        .locale(store.getters.language === 'zh' ? 'zh-cn' : 'en')
        .to(dayjs(_val))) ||
    ''
  )
}

export default (app) => {
  app.config.globalProperties.$filters = {
    dateFormat,
    relativeTime
  }
}
