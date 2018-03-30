<template>
  <div id="app">
    <siteNavBarAtPageTop ref="topNav" id="site-nav-bar-at-page-top"
      @showThisBar="showTopNavFn"
    ></siteNavBarAtPageTop>
    <keep-alive>
      <router-view id="app-main-body" :style="`${showTopNav?`margin-top:1.707rem;`:''}` +' '+ `${showBottomNav?'margin-bottom:2.09067rem;':''}`"

      />
    </keep-alive>
    <site-nav-bar-at-page-bottom id="site-nav-bar-at-page-bottom" v-show="showBottomNav" />
    <popup-prompt />
  </div>
</template>

<script>
import siteNavBarAtPageBottom from '@/components/siteNavBar_atPageBottom/siteNavBar_atPageBottom.vue'
import siteNavBarAtPageTop from '@/components/siteNavBar_atPageTop/siteNavBar_atPageTop.vue'
import popupPrompt from '@/components/base/popupPrompt.vue'
import api from '@/api'
import { mapMutations } from 'vuex'

export default {
  name: 'app',
  computed: {
    showBottomNav () {
      return this.$route.meta.siteBottomNav
    }
  },
  components: {
    siteNavBarAtPageBottom,
    siteNavBarAtPageTop,
    popupPrompt
  },
  data () {
    return {
      showTopNav: false
    }
  },
  methods: {
    ...mapMutations([
      'setUserLogInState'
    ]),
    showTopNavFn (val) {
      this.showTopNav = val
    }
  },
  created () {
    // 让前端和后台的用户登录状态保持一致
    api.getUserMeta()
    .then(res => {
      if (res.id) {
        this.setUserLogInState('loggedIn')
      }
    })
  }
}
</script>

<style lang="scss">

#app {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
}

// settings for components
// titles
h1[class^="title-"] {
  @include title-type1();
}

// page
[class^="page"] {
  padding: px2rem(0) px2rem(40);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  &>.banner {
    height: px2rem(500);
  }
  // margin-top: px2rem(85);
  background-color: white;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  // pagragraph
  &>[class^="paragraph"], &>.paragraph {
    margin-left: px2rem(-40);
    margin-right: px2rem(-40);
    padding-left: px2rem(40);
    padding-right: px2rem(40);
    background-color: white;
  }
}

// body text
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  @include text-type1();
}

#site-nav-bar-at-page-top {
  position: fixed;
  z-index: 99;
  left: 0;
  right: 0;
  top: 0;
}

#site-nav-bar-at-page-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}

// slidess
.swiper-slide {
  background-position: center;
  background-size: cover;
}
  .swiper-pagination-bullet {
      height: px2rem(15);
      width: px2rem(15);
      border-radius: px2rem(15);
      // margin: 0 px2rem(15);
    }

</style>
