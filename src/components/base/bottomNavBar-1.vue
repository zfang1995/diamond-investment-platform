<template>
  <section class="bottomNavBar-1" :autoPosition="autoPosition ? 'on':'off'">
    <div class="division-random2">
      <div @click="share(linkForShare)">
        <div class="image-share"></div>
        <div>分享</div>
      </div>
      <div @click="show('button_consult')">
        <div class="image-consult"></div>
        <div>咨询</div>
      </div>
    </div>
    <div :class="'link-id_0 '+primaryButtonEnablementState" @click="primaryButtonClickHandler">{{ primaryButtonTextContent }}</div>
    <div v-if="button_share === 'showing'" class="button_share" @click="hide('button_share')">
      <div class="inner" @click.stop>   
        <div class="title">分享到</div>
        <div  class="layoutScheme_1">
          <div>
            <div class="image-分享_微信"></div>
            <div>微信好友</div>
          </div>
          <div>
            <div class="image-分享_朋友圈"></div>
            <div>朋友圈</div>
          </div>
        </div>
        </div>
    </div>
    <div v-if="button_consult === 'showing'" class="button_consult">
      <div class="inner" @click.stop>   
        <div class="phoneNumber">0755-22270985</div>
        <div class="buttons">
          <div @click="hide('button_consult')">取消</div>
          <div @click="hide('button_consult')"><a href="tel:075522270985">呼叫</a></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      'button_share': 'hidden',
      'button_consult': 'hidden'
    }
  },
  methods: {
    share (linkForShare) {
      this.show('button_share')
    },
    hide (target) {
      this[target] = 'hidden'
    },
    show (target) {
      this[target] = 'showing'
    }
  },
  props: {
    linkForShare: [''],
    autoPosition: {
      type: Boolean,
      default: true
    },
    primaryButtonEnablementState: {
      type: String,
      default: ''
    },
    primaryButtonTextContent: {
      type: String,
      default () {
        if (this.$route.meta.TextContentOfBottomNavBar1) {
          return this.$route.meta.TextContentOfBottomNavBar1
        } else {
          return ''
        }
      }
    },
    primaryButtonClickHandler: {
      type: Function
    }
  },
  computed: {
    ...mapGetters([
      'userLogInState'
    ])
  }
}
</script>


<style lang="scss" scoped>
  
.bottomNavBar-1 {
  &[autoPosition="on"] {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    height: px2rem(98);
    background-color: white;
  }
}

.division-random2 {
  width: 50%;
  @include layoutScheme-type1(2, flex-end, 50%);
  font-size: px2rem(20);
}

.link-id_0 {
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d4d4d4;
  font-size: px2rem(40);
  color: white;
  background-image: none;
  &.enabled {
    background-image: linear-gradient(0deg, #058dcd 0%, #16b2ec 100%);
  }
}

.button_share {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  .inner {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: px2rem(370);
    padding: px2rem(40) 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
    font-size: px2rem(26);
    [class^="image-"] {
      height: px2rem(120);
      width: px2rem(120);
      align-self: center;
      background-position: center;
    }
    .layoutScheme_1 {
      height: px2rem(240);
      @include layoutScheme-type1(2, space-around, 60%) ;
    }
  }
  .title {
    text-align: center;
    font-size: px2rem(36);
    font-weight: bold;
  }
}

.button_consult {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  .inner {
    position: absolute;
    top: 0;
    bottom: 0;
    left: px2rem(100);
    right: px2rem(100);
    margin: auto;
    height: px2rem(270);
    background-color: white;
    font-size: px2rem(36);
    border-radius: px2rem(20);
    .phoneNumber {
      font-weight: bold;
      height: px2rem(185);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .buttons {
      height: px2rem(85);
      display: flex;
      border-top: px2rem(1) solid #ccc;
      &>div {
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #017cd9;
        &:first-child {
          border-right: px2rem(1) solid #ccc;
        }
      }
      a {
        display: block;
        text-decoration: none;
        color: #017cd9;
        width: 100%;
        text-align: center;
      }
    }
  }
}


</style>
