<template>
  <div class="page-homepage">
      <swiper class="homepage-banner paragraph" :options="swiperOption" ref="swiper">
        <swiper-slide @click="windowOpen(element.link)" v-for="(element, index) in slideData" :key="index" class="swiper-slide" :style="`background-image: url('${element.image}')`"></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="paragraph-class_0">
        <div @click="$router.push(`/loan?backToPath=/`)">
          <div class="image-首页-借款"></div>
          <div class="text">借款</div>
        </div>
        <div @click="$router.push(`/invest?backToPath=/`)">
          <div class="image-首页-投资"></div>
          <div class="text">投资</div>
        </div>
        <div @click="$router.push(`/realization?backToPath=/`)">
          <div class="image-首页-变现"></div>
          <div class="text">变现</div>
        </div>
        <div @click="$router.push('/')">
          <div class="image-首页-商城"></div>
          <div class="text">商城</div>
        </div>
      </div>
      <div class="paragraph-datalist" id="div_0">
        <div class="list-item" v-for="(element, index) in dataForDiv_0" :key="index">
          <div class="row">
            <div><span class="image-新"></span>{{element.title}}</div>
          </div>
          <div class="row" style="width: 63%;">
            <span>利润率<span class="text-profit">{{ element.expected_profit+'%' }}</span></span>
            <span style="font-size:1em;">{{'项目期限：'+element.limit_days+'天'}}</span>
          </div>
          <div class="row textColor_999">
            <div project-progress>
              <div class="outter">
                <div class="inner" :style="`width: ${element.archive_percent}%`"></div>
              </div>
              <div>{{ element.archive_percent+'%' }}</div>
            </div>
            <router-link tag="div" class="link-crowdFundingPage" :to="`/investment/${element.investment_type}/${element.id}`">
              立即众筹
            </router-link>
          </div>
          <div class="row textColor_999">
            <span>距离结束还剩：<span style="color: #32a9f2;">{{ element.end_date | timeLeft(now) }}</span></span>
            <span>1000元起投，限投{{ element.remain_amount+'元' }}</span>
          </div>
          <div class="image-活动专享"></div>
        </div>
      </div>
      <div class="paragraph-class_1 image-首页-组13"></div>
  </div>
</template>

<script>
import api from '@/api'

export default {
  computed: {
    $swiper () {
      return this.$refs.swiper.swiper
    }
  },
  methods: {
    windowOpen (link) {
      if (link) {
        window.open(link)
      }
    }
  },
  data () {
    return {
      dataForDiv_0: [],
      now: (new Date()).getTime(),
      swiperOption: {
      },
      slideData: []
    }
  },
  created () {
    api.getHomepageInfo()
    .then(res => {
      this.dataForDiv_0 = res.investments
    })
    api.getInvestEvents()
    .then(res => {
      res.shift()
      res.push({
        link: '',
        image: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png'
      })
      res.push({
        link: '',
        image: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png'
      })
      res.push({
        link: '',
        image: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png'
      })
      this.slideData = res
    })
  },
  mounted () {
    // setTimeout(() => {
    //   this.$swiper.init()
    // }, 0)
  }
}
</script>


<style lang="scss" scoped>
.page-homepage {
  margin-bottom: px2rem(80);
  background-color: #f4f4f4;
}
  [class^="paragraph"],.paragraph {
    margin-top: px2rem(20);
    margin-bottom: px2rem(20);
    box-shadow: 0px 0px px2rem(6) 0px rgba(0, 0, 0, 0.2);
  }

  .homepage-banner {
    height: px2rem(402);
    margin-left: px2rem(-40);
    margin-right: px2rem(-40);
    &.paragraph {
      margin-top: 0;
      padding: 0;
    }
  }
  .paragraph-class_0 {
    height: px2rem(150);
    @include layoutScheme-type1(4, center, 60%) ;
    padding-left: 0;
    padding-right: 0;
    .text {
      margin-top: px2rem(3);
    }
  }
  .paragraph-datalist {
    .list-item {
      height: px2rem(215);
      position: relative;
      font-size: px2rem(17);
      border-bottom: px2rem(1) solid #ccc;
      &>.row {
        @include row(53.5);
        &:first-of-type, &:nth-of-type(2) {
          align-items: flex-end;
          line-height: 0.8rem;
        }
      }
      .link-crowdFundingPage {
        @include button-type2(42, 140);
          background-image: linear-gradient(0deg, #2e4fdb 0%, #16b2ec 100%);
          border-radius: px2rem(3); 
      }
      .text-profit {
        margin-left: px2rem(12);
        font-size: px2rem(34);
        color: #32a9f2;
      }
      .textColor_999 {
        color: #999;
      }
      .image-新 {
        display: inline-block;
        margin-bottom: px2rem(-7);
        margin-right: px2rem(10);
        height: px2rem(30);
        width: px2rem(30);
      }
      .image-活动专享 {
        position: absolute;
        top: 0; right: 0;
        height: px2rem(75);
        width: px2rem(70);
      }
    }
    [project-progress] {
      @include progressBar(43%);
        padding-left: 0;
        font-size: px2rem(17);
        color: #999;
    }
  }
  
  .image-首页-组13 {
    height: px2rem(520);
    background-size: auto 100%;
    background-position: center;
    background-repeat: no-repeat;
  }

</style>
