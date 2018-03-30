<template>
  <div class="page-investmentDetails">
    <list-1 class="paragraph" :inComingData="dataMapForList1"/>
    <list-2 class="paragraph" :inComingData="dataMapForList2"/>
  </div>
</template>

<script>
import list1 from '@/components/user/base/list-1.vue'
import list2 from '@/components/user/base/list-2.vue'
import api from '@/api'
import formatMoney from '@/assets/script/formatMoney'

export default {
  components: {
    list1, list2
  },
  created () {
    // getUserInvestmentsLogs from server
    switch (this.$route.params.orderType) {
      case 'invest':
        api.getUserInvestmentDetails(this.$route.params.id).then((res) => {
          // data for list-1
          let object1 = {}
          object1['可投资总额'] = formatMoney(res.investment.total_amount).toString()
          object1['收益'] = `${res.investment.expected_profit}%`
          object1['我的投资额'] = formatMoney(res.amount).toString()
          this.dataMapForList1 = object1
          // data for list-2
          let object2 = {}
          object2['订单状态：'] = res.status
          object2['订单编号：'] = res.number
          object2['创建时间：'] = res.investment.start_date.slice(0, 10)
          object2['付款时间：'] = res.investment.start_date.slice(11, 19)
          this.dataMapForList2 = object2
        })
        break
      case 'cash':
        api.getUserCashDetails(this.$route.params.id).then((res) => {
          // data for list-1
          let object1 = {}
          object1['可投资总额'] = formatMoney(res.investment.total_amount).toString()
          object1['收益'] = `${res.investment.expected_profit}%`
          object1['我的投资额'] = formatMoney(res.amount).toString()
          this.dataMapForList1 = object1
          // data for list-2
          let object2 = {}
          object2['订单状态：'] = res.status
          object2['订单编号：'] = res.number
          object2['创建时间：'] = res.investment.status
          object2['付款时间：'] = res.investment.status
          this.dataMapForList2 = object2
        })
        break
      case 'loan':
        api.getUserLoanDetails(this.$route.params.id).then((res) => {
          // data for list-1
          let object1 = {}
          object1['可投资总额'] = formatMoney(res.investment.total_amount).toString()
          object1['收益'] = `${res.investment.expected_profit}%`
          object1['我的投资额'] = formatMoney(res.amount).toString()
          this.dataMapForList1 = object1
          // data for list-2
          let object2 = {}
          object2['订单状态：'] = res.status
          object2['订单编号：'] = res.number
          object2['创建时间：'] = res.investment.status
          object2['付款时间：'] = res.investment.status
          this.dataMapForList2 = object2
        })
        break
    }
  },
  data () {
    return {
      dataMapForList1: {},
      dataMapForList2: {}
    }
  }
}
</script>

<style lang="scss" scoped>
.page-investmentDetails {
  padding-top: px2rem(20);
  padding-bottom: px2rem(20);
  background-color: #f7f7f7;
  .paragraph {
    margin: px2rem(20) px2rem(-40);
  }
}
</style>
