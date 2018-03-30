<template>
  <section class="page-requestALoan">
    <div class="paragraph-JewelryDetails">
      <h1 class="title-JewelryDetails">珠宝详情</h1>
      <list-form :inComingObject="dataMapForLoanForm" ref="listForm"></list-form>
    </div>
    <div class="link-commitForm" @click="commitForm">提交</div>
  </section>
</template>

<script>
import listForm from '@/components/base/listForm.vue'
import api from '@/api'

export default {
  components: {
    listForm
  },
  methods: {
    commitForm () {
      if (this.lockBtn) {
        return
      }
      this.lockBtn = true

      let listForm = this.$refs.listForm
      // 验证表单
      if (!listForm.validate()[0]) {
        this.lockBtn = false
        return
      }
      // 验证手机
      listForm.validateVCode()
        .then(data => {
          if (data.code === 200) {
            return true
          } else {
            listForm.showHintText(data.message)
            return Promise.reject(data.message)
          }
        })
        .then(() => {
          // post数据
          let formData = listForm.getFormData()
          formData.loan_days = Number(formData.loan_days.slice(-1, -2))
          return api.postLoans({
            'loan': formData
          })
            .then(data => {
              if (data.code === 200) {
                this.$router.push({
                  path: `/loan/waitCallback`
                })
              } else {
                listForm.showHintText(data.message)
                return Promise.reject(data.message)
              }
            })
        })
        .catch(() => {
          this.lockBtn = false
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
      lockBtn: false,
      dataMapForLoanForm: {
        goods: {
          name: '珠宝品类',
          inputType: 'select',
          placeholder: '请选择品类',
          options: ['钻石', '翡翠', '宝石'],
          rules: [{
            type: 'required',
            msg: '请选择珠宝品类'
          }]
        },
        goods_amount: {
          name: '珠宝货值',
          placeholder: '请输入货值',
          inputType: 'number',
          numberUnit: '元',
          rules: ['required', 'money']
        },
        expected_amount: {
          name: '借款金额',
          placeholder: '请输入金额',
          inputType: 'number',
          numberUnit: '元',
          rules: ['required', 'money']
        },
        loan_days: {
          name: '借款期限',
          placeholder: '请选择期限',
          inputType: 'select',
          options: ['30天', '60天', '90天'],
          rules: [{
            type: 'required',
            msg: '请选择借款期限'
          }]
        },
        name: {
          name: '姓&#160;&#160;&#160;&#160;&#160;&#160;&#160;名',
          placeholder: '请输入姓名',
          rules: [{
            type: 'required',
            msg: '请输入姓名'
          }]
        },
        phone: {
          name: '手机号码',
          placeholder: '请输入号码',
          inputType: 'tel',
          rules: ['required', 'phone']
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
    @include button-type1();
    margin: px2rem(130) auto px2rem(100);
  }

</style>
