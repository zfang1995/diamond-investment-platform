<template>
  <!-- <transition name="slide"> -->
    <div class="page-investmentDetails" ref="componentRoot">
      <div class="banner" :style="`background-image: url(${head_image});`"></div>
      <section class="paragraph-investmentDetails">
        <div class="headline">
          <div class="title">
            {{ title }}
            <!-- <span :class="$logo"></span> -->
          </div>
          <div v-if="typeof status === 'object'" class="status">
            <span class="pairs-key">{{ Object.keys(status)[0] }}</span>
            <span class="pairs-value">{{ status[Object.keys(status)[0]] }}</span>
          </div>
          <div v-if="typeof status === 'string'" class="status">
            {{ status }}
          </div>
        </div>
        <div class="logos">
          <div>
            <span class="image-diamond-2"></span><span>珠宝</span>
          </div>
          <div v-if="$route.params.investType==='single'">
            <span class="image-investment-2"></span><span>投资</span>
          </div>
          <div v-if="$route.params.investType==='cf'">
            <span class="image-crowdFunding"></span><span>众筹</span>
          </div>
          <div v-if="$route.params.investType==='collected'">
            <span class="image-collect"></span><span>集采</span>
          </div>
            <div v-if="$route.params.investType==='predict'">
            <span class="image-predict"></span><span>预告</span>
          </div>
          <div>
            <span class="image-lucre"></span><span>收益权</span>
          </div>
          <div v-if="$route.params.investType==='predict'">
            <span class="image-location"></span><span>广东-深圳</span>
          </div>
        </div>
        <div class="text-random-1">
          {{ introduction }}
        </div>
        <div class="project-progress progress-bar" v-if="$route.params.investType==='cf' || $route.params.investType==='collected'">
          <div class="outter">
            <div class="inner" :style="`width: ${archive_percent}%`"></div>
          </div>
          <div>{{ archive_percent+'%' }}</div>
        </div>
        <div class="division-random1" v-if="$route.params.investType!=='predict'">
          <div>
            <div>{{ total_amount }}</div>
            <div class="color-mute">总额</div>
          </div>
          <div>
            <div>{{ start_price }}</div>
            <div class="color-mute">投资</div>
          </div>
          <div>
            <div>{{ expected_profit }}</div>
            <div class="color-mute">收益</div>
          </div>
          <div>
            <div>{{ limit_days }}</div>
            <div class="color-mute">期限</div>
          </div>
        </div>
        <div class="division-random11" v-if="$route.params.investType==='predict'">
          <div>
            <div>{{ total_amount }}</div>
            <div class="color-mute">筹集目标</div>
          </div>
          <div>
            <div>{{ start_date | formatDate }}</div>
            <div class="color-mute">上线时间</div>
          </div>
        </div>
        <table-1 v-if="dataMapForTable" :inComingData="dataMapForTable" class="table-1"></table-1>
        <!-- <div class="division-random3">
          <div>产品参数详情</div>
          <div @click="viewProductDetails" class="link-productDetails">查看</div>
        </div> -->
      </section>
      <section class="section-detailsAndScheme">
        <tabs-1 :inComingData="dataMapForTabs" class="tabs-1"/>
        <div class="spaceholder-line"></div>
        <router-view :projectDetails="project_detail" :investmentScheme="project_info" />
      </section>
      <bottomNavBar v-bind="dataMapForBottomNavBar"></bottomNavBar>
      <!-- <productDetailsPage v-if="showProductDetails" @closeThis="showProductDetails = false"></productDetailsPage> -->
      <div v-if="paragraph_subscribeSucceed === 'showing'" class="paragraph_subscribeSucceed">
        <div class="inner">
          <div class="title">订阅成功</div>
          <div class="image-预告_微信2"></div>
          <div>项目开始时，我们的工作人员会用短信的形式通知您。</div>
          <div class="link-ensure" @click="hide('paragraph_subscribeSucceed')">确定</div>
        </div>
      </div>
    </div>
  <!-- </transition> -->
</template>

<script>
import serverApi from '@/api'
import table1 from '@/components/base/table-1.vue'
import formatMoney from '@/assets/script/formatMoney.js'
import tabs1 from '@/components/base/tabs-1.vue'
import bottomNavBar from '@/components/base/bottomNavBar-1.vue'
// import productDetailsPage from '@/components/invest/page-productDetails/page-productDetails.vue'

export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.initializeData()
      console.log(vm.$route)
    })
  },
  // beforeRouteLeave (to, from, next) {
  //   this.$nextTick(() => {
  //     this.$destroy()
  //   })
  //   next()
  // },
  computed: {
    dataMapForBottomNavBar () {
      if (this.$route.params.investType === 'predict') {
        return this.temp0
      } else {
        return this.temp1
      }
    },
    dataMapForTabs () {
      return [
        {
          path: `/investment/${this.$route.params.investType}/${this.$route.params.id}/project-details`,
          pathName: '项目详情'
        },
        {
          path: `/investment/${this.$route.params.investType}/${this.$route.params.id}/investment-scheme`,
          pathName: '投资方案'
        }
      ]
    },
    investmentId () {
      return this.$route.params.id
    }
  },
  components: {
    table1, tabs1, bottomNavBar
  },
  methods: {
    hide (target) {
      this[target] = 'hidden'
    },
    subscribe () {
      this.paragraph_subscribeSucceed = 'showing'
    },
    jumpToPurchasePage () {
      this.$router.push('/user/purchase/' + this.$route.params.id)
    },
    // onWheelhandler (event) {
    //   if (this.showProductDetails) {
    //     event.preventDefault()
    //   }
    // },
    // viewProductDetails () {
    //   this.showProductDetails = true
    // },
    initializeData () {
      let investmentId = this.investmentId

      serverApi.getInvestmentDetails(investmentId).then(response => {
        this.title = response.title
        this.status = response.status
        this.id = response.id
        this.total_amount = formatMoney(response.total_amount).toString()
        this.start_price = formatMoney(response.start_price).toString()
        this.expected_profit = response.expected_profit + '%'
        this.limit_days = response.limit_days + '天'
        this.pathOfThisPage = this.$route.path
        this.dataMapForTable = response.gia_info
        this.investment_type = response.investment_type
        this.archive_percent = response.archive_percent
        this.head_image = response.head_image
        this.introduction = response.introduction
        this.project_detail = response.project_detail
        this.project_info = response.project_info
        this.start_date = response.start_date
      })

      // switch (this.$route.params.investType) {
      //   case 'single':
      //     break
      //   case 'cf':
      //     break
      //   case '':
      //     break
      //   case 'collected':
      //     break
      // }
    }

  },
  data () {
    return {
      pathOfThisPage: '',
      dataMapForTable: {},
      title: '',
      status: '',
      id: '',
      total_amount: '',
      start_price: '',
      expected_profit: '',
      limit_days: '',
      investment_type: '',
      archive_percent: 0,
      // showProductDetails: false,
      head_image: '',
      introduction: '',
      project_detail: '',
      project_info: '',
      start_date: '',
      paragraph_subscribeSucceed: 'hidden',
      temp0: {
        primaryButtonTextContent: '订阅',
        primaryButtonEnablementState: 'enabled',
        primaryButtonClickHandler: () => {
          this.temp0.primaryButtonTextContent = '已订阅'
          this.temp0.primaryButtonEnablementState = ''
          this.temp0.primaryButtonClickHandler = null
          this.subscribe()
        }
      },
      temp1: {
        primaryButtonTextContent: '购买',
        primaryButtonEnablementState: 'enabled',
        primaryButtonClickHandler: () => {
          this.temp1.primaryButtonTextContent = '已购买'
          this.temp1.primaryButtonEnablementState = ''
          this.temp1.primaryButtonClickHandler = null
          this.jumpToPurchasePage()
        }
      }
    }
  }
  // created () {
  //   this.initializeData()
  // },
  // watch: {
  //   showProductDetails (value) {
  //     if (value === true) {
  //       this.$refs.componentRoot.style.overflowY = 'hidden'
  //     } else {
  //       this.$refs.componentRoot.style.overflowY = 'scroll'
  //     }
  //   }
  // }
}
</script>


<style lang="scss" scoped>
.page-investmentDetails {
  // padding-top: px2rem(80);
  padding-bottom: px2rem(98);
  .progress-bar {
    height: px2rem(30);
    padding: 0 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: px2rem(25);
    color: #2124bd;
    .outter {
      height: 30%;
      margin-right: 5%;
      flex-grow: 1;
      background-color: #bfbfbb;
      .inner {
        height: 100%;
        background-color: #2124bd;
      }
    }
  }
}
  .section-detailsAndScheme {
    margin: 0 px2rem(-40);
    padding: 0 px2rem(40);
    box-shadow: 0px 0px px2rem(9) 0px rgba(5, 32, 32, 0.1);
    .spaceholder-line {
      margin: 0 px2rem(-40);
      height: px2rem(2);
	    background-color: #d1d1d1;
    }
  }
  .banner {
    margin: 0 px2rem(-40);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: 0 px2rem(3) px2rem(6) 0 rgba(5, 32, 32, 0.1)
  }

.paragraph-investmentDetails {
  padding: px2rem(40) px2rem(40);
  font-size: px2rem(25);
  & .headline {
    height: px2rem(60);
    display: flex;
    justify-content: space-between;
    line-height: px2rem(60);
    vertical-align: middle;
    &>:first-child {
      font-size: px2rem(36);
      // font-weight: bold;
      color: black;
    }
    &>:last-child {
      font-size: px2rem(25);
      color: #007bd9;
      &>.pairs-key {
        font-size: px2rem(17);
        color: #969696;
      }
      &>.pairs-value {
        font-size: px2rem(17);
      }
    }
  }
  .text-random-1 {
    margin: px2rem(40) 0;
    padding: 0 px2rem(5);
    color:#969696;
  }

  & .logos {
    margin: px2rem(10) 0;
    display: flex;
    align-items: center;
    &>* {
      flex-grow: 1;
      display: flex;
      align-items: center;
    }
    & [class^="image-"] {
      display: inline-block;
      width: px2rem(30);
      height: px2rem(30);
      background-position: center center;
      margin-right: px2rem(15);
    }
  }
  .table-1 {
    margin: px2rem(40) 0;
  }
}


.bottomNavBar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: px2rem(98);
  background-color: white;
}
.link-purchase {
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d4d4d4;
  font-size: px2rem(40);
  color: white;
  background-image: linear-gradient(0deg, #058dcd 0%, #16b2ec 100%);
  &.purchased {
    background-image: none;
  }
}

.division-random1 {
  margin: px2rem(40) 0;
  width: 100%;
  height: px2rem(80);
  @include layoutScheme-type1(4, space-between, 50%);
  .color-mute {
    color: #969696;
  }
}

.division-random11 {
  margin: px2rem(40) 0;
  width: 100%;
  height: px2rem(80);
  @include layoutScheme-type1(2, space-between, 50%);
  .color-mute {
    color: #969696;
  }
}

.division-random2 {
  width: 50%;
  @include layoutScheme-type1(2, flex-end, 50%) ;
  font-size: px2rem(20);
}
.division-random3 {
  padding: 0 px2rem(30);
  display: flex;
  justify-content: space-between;
  .link-productDetails {
    color: #2124bd;
  }
}

.paragraph_subscribeSucceed {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  .inner {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: px2rem(595);
    width: px2rem(550);
    margin: auto;
    padding: px2rem(40);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    font-size: px2rem(26);
    border-radius: px2rem(20);
    .image-预告_微信2 {
      height: px2rem(125);
      width: px2rem(145);
    }
    .link-ensure {
      @include button-type1(72, 320) ;
        border-radius: px2rem(10);
    }
  }
  .title {
    text-align: center;
    font-size: px2rem(36);
    font-weight: bold;
  }
}

// 动画效果
  // .slide-leave-active {
  //   transition: all 0.9s
  //  } 
  // .slide-leave-to {
  //   transform: translate3d(100%, 0, 0)
  // }
</style>
