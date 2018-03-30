<template>
  <div class="page-consult">
    <div class="row-class_0">
      <span>微信客服</span><span>深圳市钻盈互联网有限公司</span>
    </div>
    <div class="row-class_0">
      <span>客服热线</span><span>0755-22270985</span>
    </div>
    <div class="row-class_0">
      <span>公众号</span><span>深圳市钻盈互联网有限公司</span>
    </div>
    <div class="image-公众号二维码"></div>
    <div class="outterWrap-text_公众号"><span class="text-公众号">公众号</span></div>
  </div>
</template>

<style lang="scss" scoped>
.page-consult {
  padding-top: px2rem(10);
}
  .row-class_0 {
    font-size: px2rem(25);
    @include row(88) ;
    &>:last-child {
      color: $color-linkText;
      margin-right: 10%;
    }
    border-bottom: px2rem(1) solid #ccc;
  }
  .image-公众号二维码 {
    height: px2rem(252);
    width: px2rem(252);
    margin: px2rem(83) auto;
    box-shadow: 0px 0px px2rem(10) 0px rgba(1, 23, 72, 0.8);
  }
  .outterWrap-text_公众号 {
    font-size: px2rem(44);
    color: $color-linkText;
    .text-公众号 {
      background-color: white;
      padding: 0 0.9em;
    }
    @include row();
      justify-content: center;
      width: 80%;
      margin: 0 auto;
    @include line-atBackground();
  }
</style>
