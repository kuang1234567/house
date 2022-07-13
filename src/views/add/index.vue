<template>
  <div class="container">
    <van-nav-bar
      title="发布房源"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <h4 class="title">房源信息{{ value4 }}</h4>
    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <van-cell
        title="小区名称"
        is-link
        :value="value4"
        @click="$router.push('/search')"
      />
      <van-field v-model="info.price" label="租金" placeholder="请输入租金/月">
        <template #extra>
          <div>￥/月</div>
        </template></van-field
      >
      <van-field
        v-model="info.size"
        label="建筑面积"
        placeholder="请输入建筑面积"
      >
        <template #extra>
          <div>m²</div>
        </template></van-field
      >
      <van-cell
        title="户型"
        is-link
        :value="value1"
        @click="roomtypeshow = !roomtypeshow"
      />
      <van-cell
        title="所在楼层"
        is-link
        :value="value2"
        @click="floorshow = true"
      />
      <van-cell
        title="朝向"
        is-link
        :value="value3"
        @click="orientedshow = !orientedshow"
      />
      <div class="housetitle">房屋标题</div>
      <van-field
        v-model="info.title"
        placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
      />
      <div class="housetitle">房屋图像</div>
      <van-field name="uploader" label="文件上传">
        <template #input>
          <van-uploader v-model="uploader" />
        </template>
      </van-field>
      <div class="housetitle">房屋图像</div>
      <div class="configure">
        <div
          class="item"
          :class="{ active: supporting.includes(item) }"
          v-for="(item, index) in condition.supporting"
          :key="index"
          @click="supporting.push(item)"
        >
          <van-icon name="orders-o" />
          <p>{{ item.label }}</p>
        </div>
      </div>
      <div class="housetitle">房屋图像</div>
      <van-field
        v-model="info.descrition"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
        class="textarea"
      />
    </van-form>
    <!-- shi -->
    <van-popup
      v-model="roomtypeshow"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-picker
        ref="roomtype"
        show-toolbar
        :columns="roomtypecolumns"
        @confirm="roomtypeConfirm"
        @cancel="roomtypeCancel"
      />
    </van-popup>
    <!-- louceng -->
    <van-popup v-model="floorshow" position="bottom" :style="{ height: '40%' }">
      <van-picker
        ref="floor"
        show-toolbar
        :columns="floorcolumns"
        @confirm="floorConfirm"
        @cancel="floorCancel"
      />
    </van-popup>
    <!-- chaoxiang -->
    <van-popup
      v-model="orientedshow"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-picker
        ref="oriented"
        show-toolbar
        :columns="orientedcolumns"
        @confirm="orientedConfirm"
        @cancel="orientedCancel"
      />
    </van-popup>
  </div>
</template>

<script>
import { getHouseconditionApi } from '@/api'
export default {
  name: 'add',
  created () {
    console.log(111)
    this.getHousecondition()
    this.$bus.$on('searchvalue', this.searchvalue)
  },
  data () {
    return {
      info: {
      },
      uploader: [],
      condition: [],
      roomtypecolumns: [],
      floorcolumns: [],
      orientedcolumns: [],
      roomtypeshow: false,
      orientedshow: false,
      floorshow: false,
      value1: '请选择',
      value2: '请选择',
      value3: '请选择',
      value4: '请输入小区名称',
      supporting: []
    }
  },
  mounted () {
  },
  methods: {
    onSubmit () { },
    roomtypeConfirm () {
      this.roomtypeshow = false
      const index = this.$refs.roomtype.getIndexes()
      console.log(index)
      this.value1 = this.condition.roomType[index].label
      this.info.roomType = this.condition.roomType[index].value
    },
    roomtypeCancel () {
      this.roomtypeshow = false
    },
    floorConfirm () {
      const index = this.$refs.floor.getIndexes()
      console.log(index)
      this.info.floor = this.condition.floor[index].value
      this.value2 = this.condition.floor[index].label
      this.floorshow = false
    },
    floorCancel () {
      this.floorshow = false
    },
    orientedConfirm () {
      this.orientedshow = false
      const index = this.$refs.oriented.getIndexes()
      console.log(index)
      this.info.oriented = this.condition.oriented[index].value
      this.value3 = this.condition.oriented[index].label
    },
    orientedCancel () {
      this.orientedshow = false
    },
    async getHousecondition () {
      try {
        const res = await getHouseconditionApi()
        console.log(res)
        this.condition = res.data.body
        res.data.body.roomType.forEach(item => {
          this.roomtypecolumns.push(item.label)
        })
        this.condition.floor.forEach(item => {
          this.floorcolumns.push(item.label)
        })
        this.condition.oriented.forEach(item => {
          this.orientedcolumns.push(item.label)
        })
      } catch (err) {
        console.log(err)
      }
    },
    searchvalue (item) {
      console.log(789)
      console.log(item)
      this.value4 = item.communityName
      alert(this.value4)
      this.info.community = item.community
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
  }
}
</script>

<style scoped lang='less'>
.container {
  padding-top: 46px;
  .title {
    font-size: 15px;
    font-weight: normal;
    color: #21b97a;
    padding: 15px 15px 9px;
    border: 1px solid #f2f2f2;
  }
  .housetitle {
    font-size: 14px;
    padding: 15px 15px 9px;
    border: 1px solid #f2f2f2;
  }
  .configure {
    display: flex;
    flex-wrap: wrap;
    width: 375px;
    height: 142px;
    .item {
      // background-color: pink;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 75px;
      height: 51px;
      margin: 10px 0;
      .van-icon {
        font-size: 20px;
      }
      p {
        font-size: 14px;
      }
    }
  }
  .active {
    color: #21b97a;
  }
}
/deep/.textarea {
  .van-field__control {
    height: 128px !important;
    background-color: rgb(248, 248, 248);
  }
}
</style>
