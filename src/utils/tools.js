import { commonString } from '../constant';
import { getStorageItem, StorageKeys } from './storage';

// 判断登录是否超时
export function checkLoginTimeout() {
  // 当前时间戳
  const currentTime = Date.now();
  // 缓存时间戳
  const timeStamp = getStorageItem(StorageKeys.timeStamp);
  return currentTime - timeStamp > commonString.TOKEN_TIMEOUT_VALUE;
}
