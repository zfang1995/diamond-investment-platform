<template>
  <div class="page-otherThings">
    <router-link class="row" tag="div" to="/user/realNameRegistration">
      <span>实名注册</span><span class="mask-rightWardArrow"></span>
    </router-link>
    <router-link class="row" tag="div" to="/user/appointmentToInvestment">
      <span>预约投资</span><span class="mask-rightWardArrow"></span>
    </router-link>
    <router-link class="row" tag="div" to="/user/noticeAfterInvest">
      <span>投后须知</span><span class="mask-rightWardArrow"></span>
    </router-link>
    <router-link class="row" tag="div" to="/user/riskNotice">
      <span>风险须知</span><span class="mask-rightWardArrow"></span>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.page-otherThings {
  padding-top: px2rem(15);
}
  .row {
    @include row();
    align-items: center;
    font-size: px2rem(25);
    border-bottom: px2rem(1) solid #ccc;
  }
  .mask-rightWardArrow {
    background-color: black;
    height: px2rem(25);
    width: px2rem(25);
  }
</style>

