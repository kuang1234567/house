<template>
  <div>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="'http://liufusong.top:8080' + image.imgSrc" />
      </van-swipe-item>
    </van-swipe>
    <!-- 搜索 -->
    <van-search
      v-model="searchval"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
    >
      <template #label>
        <div @click="$router.push({ name: 'city' })">
          {{ curCity }} <van-icon name="arrow-down" />
        </div>
      </template>
      <template #action>
        <van-icon name="map-marked" @click="$router.push('/map')" />
      </template>
    </van-search>
    <!-- 合租 整租 -->
    <van-grid :border="false">
      <van-grid-item text="整租" @click="$router.push('/find')">
        <template #icon>
          <van-image :src="require('@/assets/icon1.png')" />
        </template>
      </van-grid-item>
      <van-grid-item text="合租" @click="$router.push('/find')">
        <template #icon>
          <van-image :src="require('@/assets/icon2.png')" />
        </template>
      </van-grid-item>
      <van-grid-item text="地图找房">
        <template #icon>
          <van-image :src="require('@/assets/icon3.png')" />
        </template>
      </van-grid-item>
      <van-grid-item text="去出租" @click="$router.push('/add')">
        <template #icon>
          <van-image :src="require('@/assets/icon4.png')" />
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 租房小组 -->
    <div class="ground">
      <div class="title">
        <h4>租房小组</h4>
        <span>更多</span>
      </div>
      <div class="all">
        <div class="item" v-for="(item, index) in grounds" :key="index">
          <van-image
            class="itemimage"
            :src="'http://liufusong.top:8080' + item.imgSrc"
          />
          <p>
            {{ item.title }} <br />
            {{ item.desc }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getImageApi, getCityInfoApi, getgroundApi } from '@/api'
import { mapState } from 'vuex'
export default {
  created () {
    this.getCurrentCity()
    this.getImage()
    this.getCityInfoApi()
    this.getgroundApi()
  },
  data () {
    return {
      images: [
      ],
      searchval: '',
      grounds: [],
      flag: false
    }
  },
  methods: {
    onSearch () {

    },
    getCurrentCity () {
      // const { BMapGL } = window
      // console.log(BMapGL)
      // const map = new BMapGL.Map('allmap')
      // const point = new BMapGL.Point(116.331398, 39.897445)
      // map.centerAndZoom(point, 12)

      // function myFun (result) {
      //   const cityName = result.name
      //   map.setCenter(cityName)
      //   alert('当前定位城市:' + cityName)
      // }
      // const myCity = new BMapGL.LocalCity()
      // myCity.get(myFun)
      // 获取当前城市信息
      // 判断localStorage有没有定位城市\
      if (!this.curCity) {
        // 如果没有，就使用百度获取定位城市的代码来获取，并且存储到本地，然后返回该城市的数据
        const curCity = new window.BMapGL.LocalCity()
        curCity.get(async res => {
          this.$store.commit('getcurCity', res.name)
        })
      }
    },
    async getImage () {
      try {
        const res = await getImageApi()
        this.images = res.data.body
      } catch (err) {
        console.log(err)
      }
    },
    async getCityInfoApi () {
      try {
        const res = await getCityInfoApi(this.$store.state.curCity)
        // this.cityInfo = res.data.body
        this.$store.commit('getcityInfo', res.data.body)
      } catch (err) {
        console.log(err)
      }
    },
    async getgroundApi () {
      const res = await getgroundApi(this.cityInfo.value)
      this.grounds = res.data.body
    }
  },
  computed: {
    ...mapState(['curCity', 'cityInfo'])
  },
  watch: {
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.active {
  background-color: red !important;
}
.van-swipe {
  width: 375px;
  height: 212px;
}
/deep/.van-swipe__indicator--active {
  background-color: #888888;
}
/deep/.van-swipe__indicator {
  width: 8px;
  height: 8px;
}
.van-search {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
}
/deep/.van-search__action {
  color: #fff;
  font-size: 22px;
}
/deep/.van-search__label {
  margin-right: 10px;
}
/deep/.van-field__left-icon {
  border-left: 1px solid #e5e5e5;
  padding-left: 10px;
}
/deep/.van-search__content {
  background-color: #fff;
}
.van-image {
  width: 60px;
  height: 60px;
}
/deep/.van-grid-item__text {
  font-size: 14px;
  padding: 12px 0;
}
/deep/.van-grid-item__content {
  padding-bottom: 0;
}
.ground {
  padding: 15px 10px 0;
  background-color: #f6f5f6;
  width: 375px;
  height: 187px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    margin: 0 0 10px 10px;
    h4 {
      font-size: 15px;
      color: #333333;
    }
    span {
      font-size: 14px;
      color: #8c90b3;
    }
  }
  .all {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      display: flex;
      justify-content: start;
      align-items: center;
      width: 172px;
      height: 60px;
      background-color: #fff;
      border-radius: 5px;
      margin-bottom: 10px;
      .itemimage {
        margin: 0 10px;
        width: 50px;
        height: 50px;
      }
      p {
        font-size: 14px;
        color: #333333;
      }
    }
  }
}
</style>
