<template>
  <section class="page-invest">
    <nav-bar class="nav-bar"></nav-bar>
    <keep-alive>
      <router-view class="router-view"></router-view>
    </keep-alive>
  </section>
</template>

<script>
import navBar from '@/components/invest/navBar/navBar.vue'

export default {
  data () {
    return {
      visitedPageAtLastTime: ''
    }
  },
  components: {
    navBar
  },
  methods: {

  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.visitedPageAtLastTime) {
        vm.$router.push(vm.visitedPageAtLastTime)
      } else {
        vm.$router.push('/invest/newest')
      }
    })
  },
  beforeRouteUpdate (to, from, next) {
    if (to.path === '/invest') {
      next(false)
    } else {
      next()
    }
  },
  beforeRouteLeave (to, from, next) {
    this.visitedPageAtLastTime = from.path
    next()
  }
}
</script>

<style lang="scss" scoped>
  .nav-bar {
    position: absolute;
    // top: px2rem(80);
    left: 0;
    right: 0;
  }
  .router-view {
    height: 100%;
    overflow-y: scroll;
    margin-top: px2rem(80);
    margin-left: px2rem(-40);
    margin-right: px2rem(-40);
    padding-left: px2rem(40);
    padding-right: px2rem(40);
  }

</style>
