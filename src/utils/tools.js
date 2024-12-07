import { watch } from 'vue'
import store from '@/store'
import { commonConfig } from '../constant'
import { getStorageItem, StorageKeys } from './storage'
import i18n from '@/i18n'
import dayjs from 'dayjs'

// 判断是否为外部资源
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

// 密码格式校验
export function validatePassword() {
  return (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error(i18n.global.t('msg.login.passwordRule')))
    } else {
      callback()
    }
  }
}

// 监听语言变化
export function watchSwitchLang(...cbs) {
  watch(
    () => store.getters.language,
    () => {
      cbs.forEach((cb) => cb(store.getters.language))
    }
  )
}

// 判断登录是否超时
export function checkLoginTimeout() {
  // 当前时间戳
  const currentTime = Date.now()
  // 缓存时间戳
  const timeStamp = getStorageItem(StorageKeys.timeStamp)
  return currentTime - timeStamp > commonConfig.TOKEN_TIMEOUT_VALUE
}

export function generateTitle(title) {
  return title ? i18n.global.t('msg.route.' + title) : ''
}

// 验证 path 是否需要被缓存
export function validTags(path) {
  return !commonConfig.pathBlacklist.includes(path)
}

// 解析 excel 导入的时间格式
export const formatExcelDate = (numb) => {
  const time = new Date((numb - 1) * 24 * 3600000 + 1)
  time.setYear(time.getFullYear() - 70)
  const year = time.getFullYear() + ''
  const month = time.getMonth() + 1 + ''
  const date = time.getDate() - 1 + ''
  return (
    year +
    '-' +
    (month < 10 ? '0' + month : month) +
    '-' +
    (date < 10 ? '0' + date : date)
  )
}

export const dateFormat = (val, format = 'YYYY-MM-DD') => {
  const _val = val && parseInt(val)
  return (_val && dayjs(_val).format(format)) || ''
}
