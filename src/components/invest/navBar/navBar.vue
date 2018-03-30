<template>
  <div class="component-root">
    <router-link class="tab" tag="div" to="/invest/newest">
      <div>最新</div>
    </router-link>
    <router-link class="tab" tag="div" to="/invest/investments">
      <div>投资</div>
    </router-link>
    <router-link class="tab" tag="div" to="/invest/crowdfunding">
      <div>众筹</div>
    </router-link>
    <router-link class="tab" tag="div" to="/invest/collect">
      <div>采集</div>
    </router-link>
    <router-link class="tab" tag="div" to="/invest/predict">
      <div>预告</div>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
  .component-root {
    // margin: 0 px2rem(-40);
    height: px2rem(80);
    display: flex;
    font-size: px2rem(32);
    background-color: white;
    color: #808080;
    &>.tab {
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }
  
  .router-link-active {
    // background-image: linear-gradient(to top, #2e4fdb, #16b2ec);
    // background-color: #223ee3;
    // -webkit-background-clip: text;
    // background-clip: text;
    // color: transparent;
    color: #223ee3;
    position: relative;
    &::after {
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      width: 100%;
      height: px2rem(4);
      background-color: #0b31d2;
    }
  }

</style>

  