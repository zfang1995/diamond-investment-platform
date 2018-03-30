<template>
  <router-link tag="div" class="paragraph-activityDetails" :to="`/investment/${inComingData.investment_type}/${inComingData.id}`">
    <div>
      <div class="title">
        {{ inComingData.title }}
        <span :class="$logo"></span>
      </div>
      <div v-if="typeof inComingData.status === 'string'" class="status">{{ inComingData.status }}</div>
      <div v-if="typeof inComingData.status === 'object'" class="status">
        <span class="pairs-key">{{ Object.keys(inComingData.status)[0] }}</span>
        <span class="pairs-value">{{ inComingData.status[Object.keys(inComingData.status)[0]] }}</span>
      </div>
    </div>
    <div class="banner" :style="`background-image: url(${inComingData.head_image});`">
      <div v-if="inComingData['限量']" class="image-限量 flag"></div>
      <div v-if="inComingData['活动专享']" class="image-活动专享 flag"></div>
    </div>
    <div class="list-details">
      <div class="pairs-key">
        <div>总额</div>
        <div v-if="inComingData.start_price">投资</div>
        <div>收益</div>
        <div>期限</div>
      </div>
      <div class="pairs-value">
        <div>
          <div class="pairs-key">{{ inComingData.total_amount.number }}</div>
          <div class="pairs-value">{{ inComingData.total_amount.unit }}</div>
        </div>
        <div v-if="inComingData.start_price">
          <div class="pairs-key">{{ inComingData.start_price.number }}</div>
          <div class="pairs-value">{{ inComingData.start_price.unit }}</div>
        </div>
        <div>
          <div class="pairs-key">{{ inComingData.expected_profit.number }}</div>
          <div class="pairs-value">{{ inComingData.expected_profit.unit }}</div>
        </div>
        <div>
          <div class="pairs-key">{{　inComingData.limit_days.number }}</div>
          <div class="pairs-value">{{　inComingData.limit_days.unit }}</div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    inComingData: {
      default: {},
      type: Object
    },
    investmentType: ''
  },
  computed: {
    $logo () {
      switch (this.inComingData.investment_type) {
        case 'cf':
          return 'image-众筹'
        case 'collected':
          return 'image-采集'
        case 'single':
          return 'image-投资'
      }
    }
  }
}
</script>


<style lang="scss" scoped>

  .paragraph-activityDetails {
    margin: px2rem(15) px2rem(-40);
    padding: px2rem(30);
    box-shadow: 0px 0px 8px 0px rgba(5, 32, 32, 0.25);
    display: flex;
    flex-wrap: wrap;
    height: px2rem(321);
    &>:first-child {
      flex-basis: 100%;
      height: px2rem(61);
      display: flex;
      justify-content: space-between;
      line-height: px2rem(61);
      vertical-align: middle;
      &>.title {
        font-size: px2rem(36);
      }
      &>.status{
        font-size: px2rem(25);
        color: #31a9f1;
        &>.pairs-key {
          font-size: px2rem(17);
          color: #b2b2b2;
        }
        &>.pairs-value {
          font-size: px2rem(17);
        }
      }
    }
    &>div:nth-child(2) {
    // banner
      flex-basis: 40%; 
      margin-right: 5%;
      height: px2rem(200);
      width: px2rem(300);
      display: flex;
      justify-content: flex-start;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      box-shadow: 0px 0px 9px 0px rgba(5, 32, 32, 0.1)
    }
    &>:last-child {
      // list-details
      flex-basis: 50%;
      margin-left: 5%;
      height: px2rem(200);
      display: flex;
      justify-content: space-between;
      text-align: justify;
      text-align-last: justify;
      @include text-type1(25) ;
      color: #3c3c3c;
      &>.pairs-key {
        width: px2rem(100);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
      &>.pairs-value {
        width: auto;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        // min-width: ;  
        &>div {
          display: flex;
          justify-content: space-between;
          &>.pairs-key {
            margin-right: px2rem(20);
            flex-grow: 1;
            text-align: center;
            text-align-last: center;
            color: #000;
          }
        }
      }
    }
  }

  .flag {
    width: px2rem(69);
    height: px2rem(74);
    margin-right: px2rem(5); 
  }

  .image-众筹, .image-采集, .image-投资 {
    width: px2rem(98);
    height: px2rem(42);
    background-repeat: no-repeat;
    background-position: top;
  }
  



</style>
