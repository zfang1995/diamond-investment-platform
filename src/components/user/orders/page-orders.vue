<template>
  <div class="page-investments">
    <list-3 class="paragraph" v-for="(element, index) in dataMapForLists" :orderType="'invest'" :key="index" :inComingData="element"/>
    <!-- <bottom-nav-bar1 /> -->
  </div>
</template>

<script>
import list3 from '@/components/user/base/list-3.vue'
import api from '@/api'

export default {
  components: {
    list3
  },
  created () {
    // getUserInvestmentsLogs from server
    switch (this.$route.name) {
      case 'userInvestLogs':
        api.getUserInvestmentsLogs().then((res) => {
          for (let value of res) {
            let object1 = {}
            object1['状态'] = value.status
            object1['订单号'] = value.number
            object1['下单时间'] = value.created_at
            this.dataMapForLists.push(object1)
          }
        })
        break
      case 'userCashLogs':
        api.getUserCashLogs().then((res) => {
          for (let value of res) {
            let object1 = {}
            object1['状态'] = value.status
            object1['订单号'] = value.number
            object1['下单时间'] = value.created_at
            this.dataMapForLists.push(object1)
          }
        })
        break
      case 'userLoanLogs':
        api.getUserLoanLogs().then((res) => {
          for (let value of res) {
            let object1 = {}
            object1['状态'] = value.status
            object1['订单号'] = value.number
            object1['下单时间'] = value.created_at
            this.dataMapForLists.push(object1)
          }
        })
        break
    }
  },
  data () {
    return {
      dataMapForLists: []
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-investments {
    padding-top: px2rem(20);
    padding-bottom: px2rem(20);
    background-color: #f7f7f7;
    .paragraph {
      margin: px2rem(20) px2rem(-40);
      &>:first-child>:last-child {
        color: #ff0000;
      }
    }
  }
</style>
