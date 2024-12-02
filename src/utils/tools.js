import { watch } from 'vue';
import store from '@/store';
import { commonConfig } from '../constant';
import { getStorageItem, StorageKeys } from './storage';
import i18n from '@/i18n';

// 判断是否为外部资源
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

// 密码格式校验
export function validatePassword() {
  return (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error(i18n.global.t('msg.login.passwordRule')));
    } else {
      callback();
    }
  };
}

// 监听语言变化
export function watchSwitchLang(...cbs) {
  watch(
    () => store.getters.language,
    () => {
      cbs.forEach((cb) => cb(store.getters.language));
    }
  );
}

// 判断登录是否超时
export function checkLoginTimeout() {
  // 当前时间戳
  const currentTime = Date.now();
  // 缓存时间戳
  const timeStamp = getStorageItem(StorageKeys.timeStamp);
  return currentTime - timeStamp > commonConfig.TOKEN_TIMEOUT_VALUE;
}

export function generateTitle(title) {
  return title ? i18n.global.t('msg.route.' + title) : '';
}
