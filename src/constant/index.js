export const commonConfig = {
  // token 超时时长
  TOKEN_TIMEOUT_VALUE: 2 * 3600 * 1000,
  // 默认主题色
  DEFAULT_COLOR: '#409eff',
  // 不被缓存的路径
  pathBlacklist: ['/login', '/import', '/404', '/401'],
  // 用户表格头
  userExcelTitles: {
    姓名: 'username',
    联系方式: 'mobile',
    角色: 'role',
    开通时间: 'openTime'
  }
}
