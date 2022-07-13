<template>
  <div>
    <van-nav-bar
      title="房屋管理"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <HouseShow :handlerlist="rentlist"></HouseShow>
  </div>
</template>

<script>
import { getMyRentApi } from '@/api'
import HouseShow from '@/components/houseShow.vue'
export default {
  async created () {
    try {
      const res = await getMyRentApi()
      console.log(res)
      this.rentlist = res.data.body
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      rentlist: []
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
