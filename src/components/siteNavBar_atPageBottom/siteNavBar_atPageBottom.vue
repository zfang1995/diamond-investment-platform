<template>
  <div class="component-root">
    <router-link tag="li" class="link-homePage" to="/" exact="">
      <div class="image-homePage"></div>
      <div class="text">首页</div>
    </router-link>
    <router-link tag="li" class="link-investment" to="/invest">
      <div class="image-investment"></div>
      <div class="text">投资</div>
    </router-link>
    <router-link tag="li" class="link-loan" to="/loan">
      <div class="image-loan"></div>
      <div class="text">借款</div>
    </router-link>
    <router-link tag="li" class="link-realization" to="/realization">
      <div class="image-realization"></div>
      <div class="text">变现</div>
    </router-link>
    <router-link tag="li" class="link-myProfile" to="/user">
      <div class="image-myProfile"></div>
      <div class="text">我的</div>
    </router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

.component-root {
  height: px2rem(98);
  @include layoutScheme-type1(5, center, px2rem(40));
  background-color: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.router-link-active>* {
  &:first-child {
    background-color: $color-highlighted;
  }
  color: $color-highlighted;
}

[class^="image-"] {
  background-color: #2f2f2f;
  width: 100%;
}
.text {
  line-height: 1.1em;
  margin-top: 0.5em;
}
// [class^="link-"] {
//   display: block;
//   flex-grow: 1;
//   text-align: center;
// }
</style>
