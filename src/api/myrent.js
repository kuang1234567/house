import request from '@/utils/request'

// 查看我的出租
export const getMyRent = () => {
  return request({
    url: '/user/houses'
  })
}
