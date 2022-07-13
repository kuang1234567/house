import request from '@/utils/request'

// 轮播图
export const getImage = () => {
  return request({
    url: '/home/swiper'
  })
}
