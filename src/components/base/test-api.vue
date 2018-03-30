<template>
  <div></div>
</template>

<script>
import ProductionApi from '@/api/'

export default {
  created () {
    ProductionApi.sendVCode({phone: '13736070272'}).then(res => {
      // console.log('sendVCode', res)
    })

    // ProductionApi.getInvestmentsInfo('single').then(res => {
    //   console.log('getInvestmentsInfo', res)
    // })

    // ProductionApi.getInvestmentDetails('6440d753-acb8-4f45-8490-abe46cd2723c').then(res => {
    //   console.log('getInvestmentDetails', res)
    // })
    ProductionApi.checkVCode({ phone: '15736289272', code: '233666' }).then(res => {
      // console.log('checkVCode', res)
    })
    // ProductionApi.postCashOrders({
    //   'cash_order': {
    //     'gia_sku': '99666222',
    //     'purchase_date': '2017-01-01',
    //     'purchase_price': 10000,
    //     'name': 'aaa',
    //     'phone': 'bbbb'
    //   }
    // }).then(res => {
    //   ProductionApi.getUserCashLogs().then(res => {
    //     console.log('getUserCashLogs', res)
    //   })
    // })
    ProductionApi.postInvestmentOrder({
      'investment_id': 'a3577452-3470-403a-b1ae-d0e2d6692d8d',
      'amount': 10000,
      'agreement': true
    }).then(res => {
      ProductionApi.getUserInvestmentsLogs().then(res => {
        console.log('getUserInvestmentsLogs', res)
      })
    })
  }
}
</script>
