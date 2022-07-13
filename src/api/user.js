import request from '@/utils/request'
// 用户登录
export const userLogin = data => {
  return request({
    method: 'POST',
    url: '/user/login',
    data
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    url: '/user'
  })
}
