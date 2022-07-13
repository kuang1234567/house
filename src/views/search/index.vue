<template>
  <div class="container">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="#f6f5f6"
      />
      <van-cell
        v-for="(item, index) in searchlist"
        :key="index"
        @click="onclick(item)"
      >
        <template #title>
          <div>{{ item.communityName }}</div>
        </template>
      </van-cell>
    </form>
  </div>
</template>

<script>
import { getcommunityApi } from '@/api'
export default {
  created () { },
  data () {
    return {
      value: '',
      searchlist: []
    }
  },
  methods: {
    onSearch () {
      this.getcommunity()
    },
    onCancel () {
      this.$router.back()
    },
    async getcommunity () {
      const res = await getcommunityApi({ name: this.value, id: this.$store.state.cityInfo.value })
      console.log(res)
      this.searchlist = res.data.body
    },
    onclick (item) {
      this.$router.back()
      this.$bus.$emit('searchvalue', item)
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
  background-color: #f6f5f6;
  height: 100vh;
  /deep/.van-search__content {
    background-color: #fff;
  }
}
</style>
