import request from '@/utils/request'

// 获取用户列表
export const getUserManageList = (data) => {
  return request({
    url: '/user-manage/list',
    params: data
  })
}

// 获取用户详情
export const getUserDetail = (id) => {
  return request({
    url: `/user-manage/detail/${id}`
  })
}

// 获取所有用户数据
export const getUserManageAllList = () => {
  return request({
    url: '/user-manage/all-list'
  })
}

// 批量导入
export const userBatchImport = (data) => {
  return request({
    url: '/user-manage/batch/import',
    method: 'POST',
    data
  })
}

// 删除用户
export const deleteUser = (id) => {
  return request({
    url: `/user-manage/detele/${id}`
  })
}
