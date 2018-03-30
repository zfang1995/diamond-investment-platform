<template>
  <div class="page-realNameRegistration">
    <div class="text title">
      为什么要进行安全认证？
    </div>
    <div class="text">
      为确保资金安全，第三方支付平台在支付时，需要对投资人进行身份认证。
    </div>
    <div class="text title">
      提示实名验证失败怎么办？
    </div>
    <div class="text listItem">户口有过迁移——解决：当地公安机关逐级上报更新全国公民信息系统信息</div>
    <div class="text listItem">更改姓名——解决：当地公安机关逐级上报更新全国公民信息系统信息</div>
    <div class="text listItem">信息有误——提供准确信息</div>
    <div class="text listItem">非中国大陆不能开户</div>
  </div>
</template>

<style lang="scss" scoped>
.page-realNameRegistration {
  padding-top: px2rem(15);
}
  .text {
    line-height: px2rem(52);
    vertical-align: middle;
    font-size: px2rem(25);
  }
  .title {
    color: $color-linkText;
  }
  .listItem {
    &::before {
      content: '⚫';
      margin-right: px2rem(25);
    }
  }
</style>
