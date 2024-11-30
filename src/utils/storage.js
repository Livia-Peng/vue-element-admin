// 记录存储的key，以便管理
export const StorageKeys = {
  token: 'token',
  timeStamp: 'timeStamp'
};

/**
 * 存储数据
 */
export const setStorageItem = (key, value) => {
  // 将数组、对象类型的数据转化为 JSON 字符串进行存储
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(key, value);
};

/**
 * 获取数据
 */
export const getStorageItem = (key, parse = false) => {
  const data = window.localStorage.getItem(key);
  try {
    return parse ? JSON.parse(data) : data;
  } catch (err) {
    return data;
  }
};

/**
 * 删除数据
 */
export const removeStorageItem = (key) => {
  window.localStorage.removeItem(key);
};

/**
 * 删除所有数据
 */
export const removeAllStorageItem = (key) => {
  window.localStorage.clear();
};
