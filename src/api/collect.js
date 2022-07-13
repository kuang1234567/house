import request from '@/utils/request'

// 查看收藏列表
export const getMyCollect = () => {
  return request({
    url: '/user/favorites'
  })
}
