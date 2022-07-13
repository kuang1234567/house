<template>
  <div class="container">
    <van-nav-bar
      :title="houseInfo.community"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <!-- 轮播 -->
    <van-swipe :autoplay="3000" class="swipe">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
    <!-- 详情 -->
    <div class="houseinfo">
      <div class="title">
        <h4>{{ houseInfo.title }}</h4>
        <van-tag color="#e1f5f8" text-color="#40c0cf">{{
          houseInfo.tags && houseInfo.tags[0]
        }}</van-tag>
        <van-tag color="#e1f5ed" text-color="#3fc28c">{{
          houseInfo.tags &&houseInfo.tags[1]
        }}</van-tag>
        <van-tag color="#e6f2ff" text-color="#7abbfd">{{
          houseInfo.tags &&houseInfo.tags[2]
        }}</van-tag>
        <van-tag color="#e1d5f0" text-color="#40d0cf">{{
          houseInfo.tags &&houseInfo.tags[3]
        }}</van-tag>
        <van-tag color="#e1f5f8" text-color="#40c0cf">{{
          houseInfo.tags &&houseInfo.tags[4]
        }}</van-tag>
      </div>
      <div class="info">
        <span>
          <p>{{ houseInfo.price }}元/月</p>
          <span>租金</span>
        </span>
        <span>
          <p>{{ houseInfo.roomType }}</p>
          <span>房型</span>
        </span>
        <span>
          <p>{{ houseInfo.size }}/月</p>
          <span>面积</span>
        </span>
      </div>
      <div class="detail">
        <div>
          <p>装修： <span>精装</span></p>
          <p>
            楼层： <span>{{ houseInfo.floor }}</span>
          </p>
        </div>
        <div>
          <p>
            朝向：
            <span>{{ houseInfo.oriented && houseInfo.oriented[0] }}</span>
          </p>
          <p>类型： <span>普通住宅</span></p>
        </div>
      </div>
    </div>
    <!-- 地图 -->
    <div class="housearea">
      <div class="place">小区：天山星城</div>
      <div class="map"></div>
      <div class="housedata">
        <h4>房屋配套</h4>
        <div>暂无数据</div>
      </div>
    </div>
    <!-- 房屋概况 -->
    <div class="survey">
      <h4>房源概况</h4>
      <div class="homeowner">
        <div class="owner">
          <van-image round width="1.3866rem" height="1.3866rem" src="" />
          <div class="name">
            <p>王女士</p>
            <span
              ><van-icon
                name="shield-o"
                color="#fa5741"
                size="14"
                class="icon"
              />已认证房主</span
            >
          </div>
        </div>
        <van-button plain type="primary" class="btn">发消息</van-button>
      </div>
      <div class="textarea"></div>
    </div>
  </div>
</template>

<script>
import { getHouseInfoApi } from '@/api'
export default {
  name: 'houseinfo',
  created () {
    this.getHouseInfo()
  },
  data () {
    return {
      images: [
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg'
      ],
      houseInfo: {}
    }
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    async getHouseInfo () {
      try {
        const res = await getHouseInfoApi(this.id)
        console.log(res)
        this.houseInfo = res.data.body
        this.houseInfo.houseImg.forEach(item => {
          this.images.push('http://liufusong.top:8080' + item)
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.container {
  padding-top: 46px;
  background-color: #f6f5f6;
}
.swipe {
  width: 375px;
  height: 252px;
  img {
    height: 100%;
  }
}
.houseinfo {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  width: 375px;
  height: 266px;
  padding: 15px;
  .title {
    flex: 1;
    border-bottom: 1px solid #cecece;
    h4 {
      font-size: 16px;
      color: #333333;
      margin: 16px 0 0 0;
      font-weight: normal;
    }
  }
  .info {
    flex: 1;
    border-bottom: 1px solid #cecece;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      span {
        font-size: 14px;
        color: #999999;
      }
      p {
        font-size: 18px;
        color: #fa5741;
        font-weight: bold;
      }
    }
  }
  .detail {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #cecece;
    div {
      flex: 1;
      p {
        font-size: 13px;
        color: #999999;
        span {
          color: #333333;
        }
      }
    }
  }
}
.housearea {
  background-color: #fff;
  margin-top: 10px;
  .place {
    height: 44px;
    font-size: 14px;
    margin: 0 12px;
    line-height: 44px;
  }
  .map {
    width: 375px;
    height: 145px;
    background-color: pink;
  }
  .housedata {
    margin: 0 0 10px;
    padding: 0 10px;
    h4 {
      font-size: 15px;
      margin: 0 0 10px;
      padding: 15px 0;
      color: #333333;
      border-bottom: 1px solid #cecece;
    }
  }
}
.survey {
  background-color: #fff;
  padding: 0 10px;
  h4 {
    margin: 0 0 10px;
    padding: 15px 0;
    font-size: 15px;
    color: #333333;
    border-bottom: 1px solid #cecece;
  }
  .homeowner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .owner {
      display: flex;
      align-items: center;
      .name {
        display: flex;
        align-items: start;
        flex-direction: column;
        justify-content: center;
        margin-left: 10px;
        p {
          font-size: 14px;
          color: #333333;
        }
        span {
          font-size: 12px;
          color: #fa5741;
          .icon {
            font-weight: bold;
            margin-right: 6px;
          }
        }
      }
    }
    .btn {
      width: 74px;
      height: 29px;
    }
  }
}
</style>
