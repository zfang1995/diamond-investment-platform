<template>
  <section class="page-requestALoan">
    <div class="paragraph-JewelryDetails">
      <h1 class="title-JewelryDetails">珠宝详情</h1>
      <list-form :inComingObject="dataMapForLoanForm"></list-form>
    </div>
    <div class="link-commitForm" @click="commitForm">提交</div>
  </section>
</template>

<script>
import listForm from '@/components/base/listForm.vue'

export default {
  components: {
    listForm
  },
  methods: {
    commitForm () {
      this.$router.push({
        path: `/loan/waitCallback`
      })
    }
  },
  data () {
    return {
      loan: {
        goods: '钻石',
        goods_amount: 100,
        expected_amount: 80,
        loan_days: 90,
        name: '张三',
        phone: '1884442222'
      },
      dataMapForLoanForm: {
        '珠宝品类': {
          anticipantValueType: 'string',
          interactiveMode: 'select',
          placeholder: '请选择品类',
          options: ['钻石', '翡翠', '宝石']
        },
        '珠宝货值': {
          placeholder: '请输入货值',
          interactiveMode: 'input-number',
          numberUnit: '元',
          anticipantValueType: 'number',
          validateConstraints: {
            presence: true,

          }
        },
        '借款金额': {
          placeholder: '请输入金额',
          interactiveMode: 'input-number',
          numberUnit: '元',
          anticipantValueType: 'number',
          validateConstraints: {
            presence: true,

          }
        },
        '借款期限': {
          placeholder: '请选择期限',
          interactiveMode: 'select',
          options: ['30天', '60天', '90天'],
          anticipantValueType: 'string',
          validateConstraints: {
            presence: true,

          }
        },
        '姓名': '请输入姓名',
        '手机号码': {
          placeholder: '请输入号码',
          interactiveMode: 'input-number',
          anticipantValueType: 'string',
          validateConstraints: {
            presence: true,

          }
        }
      }
    }
  },
  computed: {

  }

}
</script>


<style lang="scss" scoped>

  .page-requestALoan {
    

  }
    // .list-JewelryDetails>* {
    //   @include row-type1(88) ;
    //   justify-content: space-between;
    //   &::after {
    //     @include line-type1() ;
    //   }
    // }

  .link-commitForm {
    @include button-type1() ;
    margin-top: px2rem(130);
  }

</style>
