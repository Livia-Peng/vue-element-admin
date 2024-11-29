/**
 * 判断是否为外部资源
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

// 密码格式校验
export function validatePassword() {
  return (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error('请输入6位以上密码'));
    } else {
      callback();
    }
  };
}
