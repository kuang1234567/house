<template>
  <div>
    <keep-alive :include="['add']">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
