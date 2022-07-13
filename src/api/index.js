import { userLogin, getUserInfo } from '@/api/user'
import { getMyCollect } from '@/api/collect'
import { getMyRent } from '@/api/myrent'
import { getCity, getHotCity, getCityInfo, getground, getcondition, gethouselist } from '@/api/city'
import { getImage } from '@/api/home'
import { getHouseInfo, getHousecondition, getcommunity } from '@/api/house'

export const userLoginApi = userLogin
export const getUserInfoApi = getUserInfo
export const getMyCollectApi = getMyCollect
export const getMyRentApi = getMyRent
export const getCityApi = getCity
export const getHotCityApi = getHotCity
export const getImageApi = getImage
export const getCityInfoApi = getCityInfo
export const getgroundApi = getground
export const getconditionApi = getcondition
export const gethouselistApi = gethouselist
export const getHouseInfoApi = getHouseInfo
export const getHouseconditionApi = getHousecondition
export const getcommunityApi = getcommunity
