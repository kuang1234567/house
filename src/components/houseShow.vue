<template>
  <div class="main">
    <van-cell
      v-for="(item, index) in handlerlist"
      :key="index"
      class="houseitem"
      @click="gethouseinfo(item.houseCode)"
    >
      <template #title>
        <van-image
          width="3rem"
          height="2.5rem"
          fit="cover"
          :src="'http://liufusong.top:8080' + item.houseImg"
        />
      </template>
      <div class="text">
        <h4 class="van-ellipsis">{{ item.title }}</h4>
        <p class="describe van-ellipsis">{{ item.desc }}</p>
        <van-tag color="#e1f5f8" text-color="#40c0cf">{{
          item.tags[0]
        }}</van-tag>
        <van-tag color="#e1f5ed" text-color="#3fc28c">{{
          item.tags[1]
        }}</van-tag>
        <van-tag color="#e6f2ff" text-color="#7abbfd">{{
          item.tags[2]
        }}</van-tag>
        <van-tag color="#e1d5f0" text-color="#40d0cf">{{
          item.tags[3]
        }}</van-tag>
        <van-tag color="#e1f5f8" text-color="#40c0cf">{{
          item.tags[4]
        }}</van-tag>
        <p class="price">
          <span>{{ item.price }}</span
          ><i>元/月</i>
        </p>
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'mycollect',
  props: {
    handlerlist: {
      type: Array,
      required: true
    }
  },
  created () {
  },
  data () {
    return {
      list: []

    }
  },
  methods: {
    async gethouseinfo (id) {
      this.$router.push({ name: 'detail', params: { id } })
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.main {
  padding-top: 46px;
}
/deep/.van-cell {
  justify-content: start;
}
/deep/.van-cell__title,
.van-cell__value {
  text-align: left;
  flex: unset !important;
}
/deep/.van-cell::after {
  border-bottom: 1px solid #e5e5e5 !important;
}
.text {
  padding-left: 12px;
}
.houseitem {
  h4 {
    font-size: 15px;
    color: #394043;
  }
  .describe {
    font-size: 12px;
    color: #afb2b3;
  }
  .price {
    font-size: 12px;
    color: #fa5741;
    span {
      font-size: 16px;
      font-weight: bolder;
    }
  }
}
.van-tag {
  margin-right: 5px;
}
</style>
