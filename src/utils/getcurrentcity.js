// 获取当前城市信息
export const getcurrentcity = () => {
  // 判断localStorage有没有定位城市
  const localCity = JSON.parse(localStorage.getItem('hk-city'))
  if (!localCity) {
    // 如果没有，就使用百度获取定位城市的代码来获取，并且存储到本地，然后返回该城市的数据
    const curCity = new window.BMap.LocalCity()
    curCity.get(async res => {
      console.log(res)
    })
  }
}
