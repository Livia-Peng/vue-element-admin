import { dateFormat } from '@/utils/tools'

export default (app) => {
  app.config.globalProperties.$filters = {
    dateFormat
  }
}
