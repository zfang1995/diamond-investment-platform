<template>
  <div class="projectDetails">
    <div class="paragraph-projectDetails" v-html="projectDetails"></div>
  </div>
</template>

<script>
export default {
  props: {
    projectDetails: {
      type: String,
      default: ''
    }
  },
  mounted () {
    // console.log(this.$route.matched)
  }
}
</script>


<style lang="scss" >
  .paragraph-projectDetails {
    // margin: 0 px2rem(-40);
    // height: px2rem(3939);
    font-size: px2rem(30);
    [class^="image"], img {
      display: block;
      width: 100%;
    }
  }
</style>
