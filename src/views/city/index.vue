<template>
  <div class="contianer">
    <van-nav-bar
      title="城市列表"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <!-- 注意双重循环obj为变量不能用cityjson.obj来获取要用cityjson[obj] -->
    <van-index-bar :index-list="FristPin">
      <van-index-anchor index="#">当前城市</van-index-anchor>
      <van-cell>
        <span slot="title">{{ curCity }}</span>
      </van-cell>
      <van-index-anchor index="热">热门城市</van-index-anchor>
      <van-cell
        :title="item.label"
        v-for="item in hotcity"
        :key="item.value"
        @click="$store.commit('getcurCity', item.label)"
      />
      <!--  -->
      <div v-for="obj in FristPin" :key="obj.value">
        <van-index-anchor
          :index="obj"
          v-if="cityjson[obj] ? cityjson[obj].length !== 0 : false"
        />
        <van-cell
          :title="item.label"
          v-for="item in cityjson[obj]"
          :key="item.value"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCityApi, getHotCityApi, getCityInfoApi } from '@/api'

export default {
  name: 'city',
  props: {
  },
  async created () {
    try {
      const res = await getCityApi(1)
      console.log(res)
      this.city = res.data.body
      const res1 = await getHotCityApi()
      this.hotcity = res1.data.body
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      city: [],
      FristPin: ['#', '热', 'A', 'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'Q', 'S', 'T', 'W', 'X', 'Y', 'Z'],
      indexlist: [],
      cityjson: {},
      hotcity: []
    }
  },
  mounted () {
    // 先拿到全部城市的名字
    const cityArr = []
    getCityApi(1).then(res => { // 这是axios请求,请求回来的结果是res
      for (let i = 0; i < res.data.body.length; i++) {
        // 遍历数组,拿到城市名称
        const cityName = res.data.body[i].pinyin
        // console.log(cityName)
        // 取全部城市的首字母
        const fristName = cityName.substring(0, 1) // 这里截取首字母的第一位
        // console.log(fristName)
        // 给原json添加首字母键值对
        res.data.body[i].first = fristName
        // 放入新数组
        cityArr.push(res.data.body[i])
      }
      // console.log(cityArr)
      const cityJson = {}
      // 根据首字母键值对给原数据按首字母分类
      for (let i = 0; i < this.FristPin.length; i++) { // 这里的FirstPin是一个写入了所有字母的数组,见data中
        // console.log(cityJson[this.FristPin[i]])
        cityJson[this.FristPin[i]] = cityArr.filter((value) => {
          return value.first === this.FristPin[i].toLowerCase() // 应该不区分大小写
          //
        })
      }
      console.log(cityJson)
      this.cityjson = cityJson
      // console.log(this.cityjson.key.A)
      // console.log(this.cityjson.B[0].label)
      // 处理indexlist
    })
  },
  computed: {
    ...mapState(['curCity'])
  },
  watch: {
    curCity: {
      deep: true,
      async handler (newvalue) {
        const res = await getCityInfoApi(this.curCity)
        this.$store.commit('getcityInfo', res.data.body)
      }
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.contianer {
  padding-top: 46px;
  .van-nav-bar {
    z-index: 2;
  }
  /deep/.van-index-anchor {
    font-size: 14px;
    padding: 10px 15px;
    color: #999;
  }
  /deep/.van-cell {
    width: 100%;
    height: 50px;
    padding: 0 15px;
    line-height: 50px;
    border-bottom: 1px solid #eee;
    font-size: 16px;
    color: #333;
    background: #fff;
    cursor: pointer;
  }
  /deep/.van-index-bar__sidebar {
    margin-top: 10px;
  }
  /deep/.van-index-bar__index {
    margin: 6px 15px;
    padding: unset;
  }
  /deep/.van-index-bar__index--active {
    width: 15px;
    height: 15px;
    background-color: #21b97a;
    border-radius: 50%;
    color: #fff;
  }
}
</style>
