<template>
  <div>
    <router-link v-for="(element, index) in paragraphsDataMap" :key="index" class="paragraph" tag="div" :to="`/investment/predict/${element.id}`">
      <div class="image_0" :style="`background-image: url(${element.head_image})`"></div>
      <div class="title row">{{ element.title }}</div>  
      <div class="logos row">
        <div>
          <span class="image-diamond-2"></span>
          <span>珠宝</span>
        </div>
        <div>
          <span class="image-predict"></span>
          <span>预告</span>
        </div>
        <div>
          <span class="image-lucre"></span>
          <span>收益权</span>
        </div>
        <div>
          <span class="image-location"></span>
          <span>广东-深圳</span>
        </div>
      </div>
      <div class="text-random-1">
        {{ element.introduction }}
      </div>
      <div class="row division_0">
        <div>目标<span class="text_0">{{ element.total_amount }}</span></div>
        <div>上线时间：<span>{{ element.start_date | formatDate }}</span></div>
      </div>
      <div class="spaceHolder-line"></div>
    </router-link>
  </div>
</template>

<script>
import api from '@/api'
import formatMoney from '@/assets/script/formatMoney.js'

export default {
  data () {
    return {
      mockParagraphsDataMap: [
        {
          'id': 'aaaa-bbbb-cccc-dddd',
          'title': '完美小集采5克拉钻石',
          'head_image': '/static/picture/diamonds-1.png',
          'investment_type': '采集',
          'status': '进行中',
          introduction: '切割等级用于测量。。。',
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
          },
          '限量': true,
          '活动专享': true
        },
        {
          'id': 'aaaa-bbbb-cccc-eeee',
          'title': '完美5克拉钻石',
          'head_image': './assets/picture/diamonds-1.png',
          'investment_type': '采集',
          'status': {
            '距离结束还剩：': '29天6小时25分27秒'
          },
          introduction: '切割等级用于测量。。。',
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
      ],
      paragraphsDataMap: []
    }
  },
  methods: {
    initializeDataMap (investmentType, order) {
      api.getInvestmentsInfo(investmentType, order).then((res) => {
        if (res === null) {
          this.paragraphsDataMap = this.mockParagraphsDataMap
          console.warn('you are viewing mock data')
        } else {
          this.paragraphsDataMap = JSON.parse(JSON.stringify(res)).filter(element => {
            element.total_amount = formatMoney(element.total_amount, '元', '万').toString()
            if (element.investment_amount) {
              element.investment_amount = formatMoney(element.investment_amount, '元', '元')
            }
            element.expected_profit = { number: Number(element.expected_profit).toString(), unit: '%' }
            element.limit_days = { number: Number(element.limit_days).toString(), unit: '天' }
            return true
          })
        }
      })
    }

  },
  created () {
    this.initializeDataMap('predict')
  }
}
</script>

<style lang="scss" scoped>
  .paragraph {
    padding-top: px2rem(35);
    font-size: px2rem(26);
    color: #555;
    .title {
      font-size: px2rem(36);
      color: black;
      margin-top: px2rem(25);
      margin-bottom: px2rem(25);
    }
    .image_0 {
      width: 100%;
      height: px2rem(360);
      box-shadow: 0 px2rem(0) px2rem(8) 0 rgba(5, 32, 32, 0.25)
    }
    .logos {
      margin-top: px2rem(35);
      margin-bottom: px2rem(35);
      [class^="image-"] {
        display: inline-block;
        width: px2rem(30);
        height: px2rem(30);
        background-position: center center;
        margin-right: px2rem(8);
        margin-bottom: px2rem(-7.5)
      }
    }
    .text_0 {
      color: #ee0000;margin-left: 1em;font-weight: bold;
    }
    .division_0 {
      margin-top: px2rem(45);
      margin-bottom: px2rem(44);
    }
    .spaceHolder-line {
      height: px2rem(1.2);
      margin: 0 px2rem(-40);
      background-color: #cacaca;
    }
  }
  .row {
    @include row();
    height: 1em;
  }
</style>
