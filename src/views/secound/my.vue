<template>
  <div>
    <div class="bg" v-if="!$store.state.token">
      <div class="userinfo">
        <van-image
          round
          width="1.87rem"
          height="1.87rem"
          src="http://liufusong.top:8080/img/profile/avatar.png"
        />
        <p class="username">游客</p>
        <van-button size="small" @click="$router.push('/login')">去登录</van-button>
      </div>
    </div>
    <div class="bg login" v-else>
      <div class="userinfo">
        <van-image
          round
          width="1.87rem"
          height="1.87rem"
          :src="'http://liufusong.top:8080' + UserInfo.avatar"
        />
        <p class="username">{{ UserInfo.nickname }}</p>
        <van-button size="small" @click="$store.state.token=null">退出</van-button>
        <div class="personal">编辑个人资料<van-icon name="play" /></div>
      </div>
    </div>
    <van-grid :column-num="3" :border="false" clickable>
      <van-grid-item icon="star-o" text="我的收藏" to="/mycollect"/>
      <van-grid-item icon="wap-home-o" text="我的出租" to="/myrent"/>
      <van-grid-item icon="clock-o" text="看房记录" />
      <van-grid-item icon="coupon-o" text="成为房主" />
      <van-grid-item icon="contact" text="个人资料" />
      <van-grid-item icon="service-o" text="联系我们" />
    </van-grid>
    <div class="jion-img">
      <img src="@/assets/join.png" alt="" />
    </div>
  </div>
</template>

<script>
import { getUserInfoApi } from '@/api'
export default {
  async created () {
    try {
      const res = await getUserInfoApi()
      // console.log(res)
      this.UserInfo = res.data.body
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      UserInfo: {}
    }
  },
  methods: {
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.login {
  width: 375px !important;
  height: 375px !important;
  background: url("@/assets/bg2.png") no-repeat !important;
  background-size: contain !important;
  .userinfo{
    height: 208px!important;
    .personal{
      margin-top:15px;
      font-size:12px ;
      color: #999999;
    }
  }
}
.bg {
  display: flex;
  width: 375px;
  height: 300px;
  background: url("@/assets/bg1.png") no-repeat;
  background-size: contain;
  justify-content: center;
  align-items: end;
  .userinfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 320px;
    height: 165px;
    z-index: 1;
    box-shadow: 0 0 10px 3px #ddd;
    background-color: #fff;
    .van-image {
      display: inline-block;
      box-shadow: 0 2px 2px #bdbdbd;
      border: 5px solid #f5f5f5;
      transform: translateY(-50%);
    }
    .username {
      font-size: 13px;
      transform: translateY(-20px);
    }
    .van-button {
      background-color: #21b97a;
      font-size: 13px;
      width: 70px;
      color: #fff;
      border-radius: 5px;
    }
  }
}
/deep/.van-grid-item {
  margin: 5px 0;
}
/deep/.van-grid-item__icon {
  font-size: 22px;
}
/deep/.van-grid-item__text {
  font-size: 14px;
}
.jion-img {
  margin-top: 10px;
  text-align: center;
  img {
    width: 345px;
  }
}
</style>
