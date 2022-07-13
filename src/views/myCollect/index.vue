<template>
  <div>
    <van-nav-bar
      title="我的收藏"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <!-- 住房展示 -->
    <HouseShow :handlerlist='collectlist'></HouseShow>
  </div>
</template>

<script>
import { getMyCollectApi } from '@/api'
import HouseShow from '@/components/houseShow.vue'
export default {
  async created () {
    try {
      const res = await getMyCollectApi()
      this.collectlist = res.data.body
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      collectlist: []
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {
    HouseShow
  }
}
</script>

<style scoped lang='less'>
</style>
