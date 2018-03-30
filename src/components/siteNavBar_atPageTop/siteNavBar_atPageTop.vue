<template>
  <div v-show="showThisBar" class="component-root">
    <div class="image-crumbsNavButton" v-show="showCrumbs"></div>
    <div class="image-leftWardArrow" v-show="showGoBack" @click="goBack()"></div>
    <div class="text-pageTitle">{{ $route.meta.pageName }}</div>
    <div :class="showCloseButton?'image-close2':''"></div>
    <div class="image-logout" v-if="showLogout" @click="userSignOut"></div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  watch: {
    showThisBar (val) {
      this.$emit('showThisBar', val)
    }
  },
  computed: {
    showCrumbs () {
      if (this.$route.meta.siteTopNavCrumbs === true) {
        return true
      } else {
        return false
      }
    },
    showGoBack () {
      if (this.$route.query.backToPath) {
        return true
      } else if (this.$route.meta.backToPath === false) {
        return false
      } else {
        return true
      }
    },
    showCloseButton () {
      if (this.$route.meta.couldCloseThisPage) {
        return true
      } else {
        return false
      }
    },
    showLogout () {
      if (this.$route.fullPath === '/user/profile') {
        return true
      } else {
        return false
      }
    },
    showThisBar () {
      if (this.$route.meta.siteTopNav === true) {
        return true
      } else if (this.$route.meta.siteTopNav === false) {
        return false
      } else {
        if (this.showGoBack || this.showCloseButton || this.showCrumbs ||
          this.$route.meta.pageName || this.showLogout) {
          return true
        } else {
          return false
        }
      }
    }
  },
  methods: {
    goBack () {
      if (this.$route.query.backToPath) {
        this.$router.push(this.$route.query.backToPath)
      } else if (this.$route.meta.backToPath) {
        this.$router.push(this.$route.meta.backToPath)
      } else {
        this.$router.back()
      }
    },
    ...mapActions([
      'userSignOut'
    ])
  },
  created () {
    this.$emit('showThisBar', this.showThisBar)
  }
}
</script>

<style lang="scss" scoped>
  .component-root {
    height: px2rem(80);
    padding: 0 px2rem(30);
    display: flex;
    justify-content: space-between;
    align-items: center;
    // background-color: #fff;
  }
  .image-crumbsNavButton {
    width: px2rem(63);
    height: px2rem(48);
  }
  .image-leftWardArrow {
    margin-left: px2rem(7);
    width: px2rem(21);
    height: px2rem(35);
  }
  .text-pageTitle {
    font-size: px2rem(44);
  }
  .mask-bell, .image-close2 {
    width: px2rem(35);
    height: px2rem(35);
  }
  .image-logout {
    width: px2rem(55);
    height: px2rem(55);
  }


</style>
