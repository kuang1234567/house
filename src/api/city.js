import request from '@/utils/request'

// 获取城市列表
export const getCity = (level) => {
  return request({
    url: '/area/city',
    params: { level: level }
  })
}
// 获取热门城市
export const getHotCity = () => {
  return request({
    url: '/area/hot'
  })
}
// 根据城市名获取城市信息
export const getCityInfo = name => {
  return request({
    url: '/area/info',
    params: { name }
  })
}
// 租房小组信息
export const getground = id => {
  return request({
    url: '/home/groups',
    params: { area: id }
  })
}
// 获取城市描述信息
export const getcondition = id => {
  return request({
    url: '/houses/condition',
    params: { id }
  })
}
// 根据条件获取房屋列表
export const gethouselist = ({ cityId, area, subway, rentType, oriented, characteristic, floor, start, end, price, more }) => {
  return request({
    url: '/houses',
    params: { cityId, area, subway, rentType, oriented, characteristic, floor, start, end, price, more }
  })
}
