<template>
  <div class="page-recharge">
    <div class="formWrap">
      <list-form ref="listForm" class="form-recharge" :inComingObject="dataMapForForm"/>
    </div>
    <div :class="'link-confirm '+`${lockBtn?'':'disabled'}`" @click="commitForm">确认</div>
  </div>
</template>

<script>
import listForm from '@/components/base/listForm.vue'
import api from '@/api'
import { mapActions } from 'vuex'

export default {
  components: {
    listForm
  },
  data () {
    return {
      dataMapForForm: {
        rechargeAmount: {
          name: '充值金额',
          placeholder: '请输入充值金额',
          inputType: 'number',
          rules: ['required', 'money']
        },
        bankCardNumber: {
          name: '银行卡号',
          placeholder: '请输入银行卡号',
          inputType: 'number',
          rules: ['required', 'bankCardNumber']
        },
        phone: {
          name: '手机号码',
          placeholder: '请输入手机号码',
          inputType: 'tel',
          rules: ['required', 'phone']
        }
      },
      lockBtn: false
    }
  },
  methods: {
    ...mapActions([
      'appPrompt'
    ]),
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
            this.lockBtn = false
            api.postDeposit({
              'deposit_order': {
                'bank_number': this.$refs.listForm.dataMap.bankCardNumber.toString(),
                'amount': this.$refs.listForm.dataMap.rechargeAmount,
                'phone': this.$refs.listForm.dataMap.phone,
                'code': '233666'
              }
            })
            .then(res => {
              if (res.code === 200) {
                this.$refs.listForm.dataMap = {}
                this.appPrompt('充值成功')
                .then(() => {
                  this.$router.back()
                })
              } else {
                this.appPrompt('异常错误')
              }
            })
          })
          .catch(() => {
            this.lockBtn = false
          })
    }
  }
}
</script>

<style lang="scss" scoped>
$fontSizeOfBodyText: 25;

  .page-recharge {
    font-size: px2rem($fontSizeOfBodyText);
    background-color: #f7f7f7;
    &>* {
      margin: px2rem(30) px2rem(-40);
      background-color: #fff;
      .form-recharge {
        margin: 0 px2rem(40);
        padding: px2rem(20) 0;
      }
    }
    .link-confirm {
      @include button-type1(100, 'auto') ;
      border-radius: 0;
      background-image: linear-gradient(white, white);
      color: #000;
      &.disabled {
        background-image: linear-gradient(white, white);
        color: black;
      }
    }
  }
</style>
