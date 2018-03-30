<template>
  <div>
    <swiper class="banner swiper-container"  :options="swiperOption" ref="swiper">
      <swiper-slide @click="windowOpen(element.link)" v-for="(element, index) in slideData" :key="index" class="swiper-slide" :style="`background-image: url('${element.image}')`"></swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <paragraph-activity-details v-for="item in paragraphsDataMap" :key="item.id" :inComingData="item" />
    <div></div>
  </div>
</template>

<script>
import paragraphActivityDetails from '@/components/invest/paragraph-activityDetails/paragraph-activityDetails.vue'
import api from '@/api'
import formatMoney from '@/assets/script/formatMoney.js'

export default {
  computed: {
    $swiper () {
      return this.$refs.swiper.swiper
    }
  },
  mounted () {
    setTimeout(() => {
      this.$swiper.init()
    }, 0)
  },
  components: {
    paragraphActivityDetails
  },
  data () {
    return {
      swiperOption: {
        autoplay: true,
        loop: true,
        pagination: {
          el: '.swiper-pagination'
        }
      },
      swiperData: null,
      slideData: {},
      paragraphsDataMap: [],
      mockParagraphsDataMap: [
        {
          'id': 'aaaa-bbbb-cccc-dddd',
          'title': '完美小集采5克拉钻石',
          'head_image': './assets/picture/diamonds-1.png',
          'investment_type': 'collected',
          'status': '进行中',
          'total_amount': {
            number: '100',
            unit: '万'
          },
          'investment_amount': {
            number: '1000',
            unit: '元'
          },
          'expected_profit': {
            number: '9',
            unit: '%'
          },
          'limit_days': {
            number: '30',
            unit: '天'
          }
          // ,
          // '限量': true,
          // '活动专享': true
        },
        {
          'id': 'aaaa-bbbb-cccc-eeee',
          'title': '完美5克拉钻石',
          'head_image': './assets/picture/diamonds-1.png',
          'investment_type': '采集',
          'status': {
            '距离结束还剩：': '29天6小时25分27秒'
          },
          'total_amount': {
            number: '100',
            unit: '万'
          },
          'investment_amount': {
            number: '1000',
            unit: '元'
          },
          'expected_profit': {
            number: '9',
            unit: '%'
          },
          'limit_days': {
            number: '30',
            unit: '天'
          }
        }
      ]
    }
  },
  methods: {
    windowOpen (link) {
      if (link) {
        window.open(link)
      }
    },
    initializeDataMap (investmentType, order) {
      api.getInvestmentsInfo(investmentType, order).then((res) => {
        this.paragraphsDataMap = JSON.parse(JSON.stringify(res)).filter(element => {
          element.total_amount = formatMoney(element.total_amount, '元', '万')
          element.expected_profit = { number: Number(element.expected_profit).toString(), unit: '%' }
          element.limit_days = { number: Number(element.limit_days).toString(), unit: '天' }
          element.start_price = formatMoney(element.start_price, '元', '元')
          return true
        })
        api.getInvestEvents()
        .then(res => {
          this.slideData = res
        })
        // console.log(this.paragraphsDataMap)
      })
    },

    sortParagraphsBy (basis) {
      switch (this.paragraphsOrder) {
        case `${basis}-desc`:
          this.paragraphsOrder = `${basis}-asc`
          break
        case `${basis}-asc`:
          this.paragraphsOrder = `${basis}-desc`
          break
        default:
          this.paragraphsOrder = `${basis}-asc`
          break
      }
      this.initializeDataMap('', this.paragraphsOrder)
    }
  },
  created () {
    this.initializeDataMap()
  }
}
</script>

<style lang="scss" scoped>
  .banner{
    margin: 0 px2rem(-40);
    background-size: cover;
    height: px2rem(500);
    .swiper-wrapper,
    .swiper-slide {
      height: inherit;
      background-size: cover;
      background-position: center;
    }

  }

</style>
