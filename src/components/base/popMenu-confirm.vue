<template>
  <div :class="'outterWrap-popMenuConfirm ' + `${coverEffect?'cover':''}`">
    <div class="popMenu-confirm">
      <div class="title">{{ textForTitle }}</div>
      <div class="wrap-butons">
        <div class="cancel" @click="emitCancel">{{ textForCancel }}</div>
        <div class="confirm" @click="emitConfirm">{{ textForConfirm }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    textForTitle: {
      default: '你确定吗？',
      type: String
    },
    textForCancel: {
      default: '算了',
      type: String
    },
    textForConfirm: {
      default: '确定',
      type: String
    },
    coverEffect: {
      default: true,
      type: Boolean
    }
  },
  methods: {
    emitCancel () {
      this.$emit('cancel')
    },
    emitConfirm () {
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss" scoped>
.outterWrap-popMenuConfirm{
  position: fixed;
  z-index: 100;
  top: 0; bottom: 0; left: 0; right: 0;
  &.cover {
    background-color: rgba(0, 0, 0, 0.4);
  }
}
  .popMenu-confirm {
    height: px2rem(350);
    width: px2rem(550);
    position: absolute;
    z-index: 1;
    top: 0; bottom: 0; left: 0; right: 0;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border-radius: px2rem(20);
    font-size: px2rem(25);
    background-image: linear-gradient(to right, rgb(255, 255, 255), rgb(255, 255, 255));
    background-origin: content-box;
    &.useCover {
      
    }
    .title {
      color: #008aff;
      text-align: center;
      font-size: px2rem(40);
    }
    .wrap-butons {
      display: flex;
      justify-content: space-around;
    }
    .cancel, .confirm {
      display: inline-block;
      @include button-type1(65, 205) ;
      border-radius: px2rem(10);
    }
  }
</style>
