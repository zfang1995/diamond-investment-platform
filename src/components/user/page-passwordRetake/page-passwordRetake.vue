<template>
  <div class="page-passwordRetake">
    <list-form :doubleColumnMode="false" ref="listForm" 
      :useVCode="true"
      :inComingObject="dataMapForLoginForm"
      :itemHeight="'higher'"
    />
    <div class="link-loginAndRegister"  @click="commitForm">
      重置密码
    </div>
  </div>
</template>
<script>
import listForm from '@/components/base/listForm.vue'
// import api from '@/api'

export default {
  components: {
    listForm
  },
  data () {
    return {
      dataMapForLoginForm: {
        phone: {
          name: '手机号码',
          inputType: 'tel',
          placeholder: '请输入手机号',
          rules: ['required', 'phone']
        },
        newPassword: {
          name: '新密码',
          inputType: 'password',
          placeholder: '请输入新密码',
          rules: ['required', 'password']
        }
      },
      lockBtn: false
    }
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
      console.log('commitForm')
      // 验证手机
      if (this.loginMethod === 'viaVCode') {
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
            console.log('恭喜，VCODE')
          })
          .catch(() => {
            this.lockBtn = false
          })
      } else {
        // post数据
        console.log('同喜，password')
        this.lockBtn = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$fontSizeOfBodyText: 25;
.listForm {
  margin-top: px2rem(220);
  margin-bottom: px2rem(145);
}

.link-loginAndRegister {
  @include button-type2($margin: true);
  margin-left: px2rem(-11);
}

.text-random1 {
  display: flex;
  justify-content: center;
  font-size: px2rem(20);
  font-weight: lighter;
}
</style>
