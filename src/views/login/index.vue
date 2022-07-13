<template>
  <div>
    <van-nav-bar
      title="账号登录"
      left-arrow
      @click-left="onClickLeft"
    ></van-nav-bar>
    <!-- 表单 -->
    <van-form
      @submit="onSubmit"
      class="form"
      :show-error="false"
      :show-error-message="false"
    >
      <van-field
        v-model="username"
        name="username"
        placeholder="请输入账号"
        :rules="[{ validator: validator1 }, { validator }]"
        class="field"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        placeholder="请输入密码"
        :rules="[{ validator: validator2 }, { validator: validator3 }]"
        class="field"
      />
      <div style="margin: 16px">
        <van-button
          block
          type="info"
          native-type="submit"
          color="#21b97a"
          size="large"
          >登录</van-button
        >
        <!-- a跳转注册页 -->
        <div class="buttom-a">
          <a href="javascript:;">还没有账号，去注册~</a>
        </div>
      </div>
    </van-form>
  </div>
</template>
$toast('不能为空')
<script>
import { userLoginApi } from '@/api/index'
export default {
  created () { },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    // 表单校验项
    validator (val) {
      const res = /^[a-zA-Z0-9_-]{5,8}$/.test(val)
      if (res) {
        return res
      } else {
        this.$toast('用户名为5-8位字母和数字')
        return res
      }
    },
    validator1 (val) {
      if (val.length > 0) {
        return true
      } else {
        this.$toast('用户名不能为空')
        return false
      }
    },
    validator2 (val) {
      if (val.length > 0) {
        return true
      } else {
        this.$toast('密码不能为空')
        return false
      }
    },
    validator3 (val) {
      const res = /^[a-zA-Z0-9_-]{5,12}$/.test(val)
      if (res) {
        return res
      } else {
        this.$toast('密码为5-12位字母和数字')
        return res
      }
    },
    // 登录
    async onSubmit (values) {
      try {
        const res = await userLoginApi(values)
        console.log(res)
        if (res.data.status === 200) {
          this.$toast(res.data.description)
          this.$store.commit('getToken', res.data.body.token)
          this.$router.go(-1)
        } else if (res.data.status === 400) {
          this.$toast(res.data.description)
        } else {
          this.$toast('登录异常！请稍后重试')
        }
      } catch (err) {
        console.log(err)
        this.$toast('登录异常！请稍后重试')
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
.form {
  margin-top: 20px;
}
/deep/ .field {
  height: 60px;
  width: 100%;
  padding: 2px 0;
  border: 0;
  color: #000;
  font-size: 17px;
  background-color: transparent;
  .van-field__value {
    display: flex;
    align-items: center;
    padding-left: 15px;
    overflow: visible;
  }
}
.buttom-a {
  margin-top: 15px;
  text-align: center;
  a {
    color: #666666;
    font-size: 14px;
  }
}
</style>
