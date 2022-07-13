import request from '@/utils/request'

// 获取具体房屋信息
export const getHouseInfo = (id) => {
  return request({
    url: `/houses/${id}`
  })
}
// 发布房屋的所需的
export const getHousecondition = () => {
  return request({
    url: '/houses/params'
  })
}
// 小区关键字查询
export const getcommunity = ({ name, id }) => {
  return request({
    url: '/area/community',
    params: { name, id }
  })
}
