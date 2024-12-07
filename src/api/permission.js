import request from '@/utils/request'

export default {
  // 获取所有权限项
  permissionList: () => {
    return request({
      url: '/permission/list'
    })
  },
  // 获取所有角色
  roleList: () => {
    return request({
      url: '/role/list'
    })
  },
  // 获取指定角色的权限
  rolePermission: (roleId) => {
    return request({
      url: `/role/permission/${roleId}`
    })
  },
  // 修改角色权限
  distribute: (data) => {
    return request({
      url: '/role/distribute-permission',
      method: 'POST',
      data
    })
  }
}
