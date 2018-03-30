<template>
  <div class="tabs-1">
    <router-link v-for="element in inComingData" class="tab" tag="div" :to="element.path" :key="element.path" replace="">
      <div>{{ element.pathName }}</div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    inComingData: {
      default: [],
      type: Array
    }
  },
  data () {
    return {
      mockInComingData: [
        {
          path: '/invest',
          pathName: '投资'
        },
        {
          path: '/newest',
          pathName: '最新'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs-1 {
  // margin: 0 px2rem(-40);
  height: px2rem(80);
  display: flex;
  font-size: px2rem(32);
  background-color: white;
  color: black;
  &>.tab {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    border-bottom: px2rem(4) solid #fff;

    &.router-link-active {
      color: #223ee3;
      border-bottom: px2rem(4) solid #0b31d2;
    }
  }
}

</style>

