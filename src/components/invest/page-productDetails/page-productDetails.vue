<template>
  <div class="page-productDetails" >
    <div class="paragraph-productDetails"></div>
    <div class="link-back" @click="goBack">确认</div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack () {
      this.$emit('closeThis')
    }
  }
}
</script>

<style lang="scss" scoped>
.page-productDetails {
  position: fixed;
  z-index: 1000;
  background-color: white;
  margin-top: 0;
  padding: 0;
  overflow: scroll;
}
.paragraph-productDetails {
  margin-bottom: px2rem(100);
  height: 100%;
  width: 100%;
}
.link-back {
  position: fixed;
  bottom: 0;
  @include button-type1(98);
  height: px2rem(98);
  width: 100%;
  border-radius: 0; 
}
</style>
