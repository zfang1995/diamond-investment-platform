<template>
  <div class="page-login">
    <div class="whiteSpaceHolder"></div>
    <list-form :doubleColumnMode="false" ref="listForm"
      :useVCode="loginMethod === 'viaVCode' ? true : false"
      :inComingObject="dataMapForLoginForm"
    />
    <div v-if="loginMethod === 'viaVCode'" class="paragraph-loginViaPassword">
      <span class="link-loginViaPassword" 
        @click="changeLoginMethodTo('viaPassword')"
      >密码登录</span>
    </div>
    <div v-if="loginMethod === 'viaPassword'" class="paragraph-loginViaVCode">
      <span class="link-loginViaVCode"
        @click="changeLoginMethodTo('viaVCode')"        
      >验证码登录</span>
      <router-link tag="span" class="link-passwordRetake"
        to="/user/passwordRetake"
      >忘记密码</router-link>
    </div>
    <div class="wrap-loginAndRegister">     
      <div class="link-loginAndRegister" @click="commitForm">
        注册/登录
      </div>
    </div>
    <div class="text-random1">
      点击登录，即表示您同意 <span style="color: #1133c8;">《注册协议》</span> 
    </div>
    <div class="paragraph-loginViaOtherMethods">
      <div class="text-loginViaOtherMethods">
        <span class="innerWrap">其它方式登录</span>
      </div>
      <div class="image-weChatLogo"></div>
    </div>
  </div>
</template>

<script>
import listForm from '@/components/base/listForm.vue'
// import api from '@/api'
import {mapActions} from 'vuex'

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
        }
      },
      loginMethod: 'viaVCode',
      lockBtn: false
    }
  },
  methods: {
    ...mapActions([
      'userLogIn'
    ]),
    changeLoginMethodTo (methodName) {
      this.loginMethod = methodName
      switch (methodName) {
        case 'viaPassword':
          Object.assign(this.dataMapForLoginForm, {
            password: {
              name: '密码',
              inputType: 'password',
              placeholder: '请输入密码',
              rules: ['required', 'password']
            }
          })
          break
        case 'viaVCode':
          for (let key in this.dataMapForLoginForm) {
            if (key !== 'phone') {
              delete this.dataMapForLoginForm[key]
            }
          }
          break
      }
    },
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
            this.userLogIn(this.$refs.listForm.dataMap.phone)
            .then(() => {
              if (this.$route.query.nextPath) {
                this.$router.replace(this.$route.query.nextPath)
              } else {
                this.$router.back()
              }
            })
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
  .whiteSpaceHolder {
    height: px2rem(245);
  }

  .paragraph-loginViaPassword, .paragraph-loginViaVCode {
    @include row-type1(88) ;
    justify-content: space-between;
    align-items: center;
    font-size: px2rem($fontSizeOfBodyText);
  }
    .link-loginViaPassword, .link-loginViaVCode {
      color: #3139c8;
    }
  .wrap-loginAndRegister {
    margin-left: px2rem(-40);
    margin-right: px2rem(-40);
  }
  .link-loginAndRegister {
    @include button-type2($margin: true) ;
    margin-left: auto;
    margin-right: auto;
  }
  .text-random1 {
    display: flex;
    justify-content: center;
    font-size: px2rem(20);
    font-weight: lighter;
  }
  .paragraph-loginViaOtherMethods {
    margin-top: px2rem(190);
  }
  .text-loginViaOtherMethods {
    background-color: white;
    @include line-atBackground() ;
  }
  .image-weChatLogo {
    height: px2rem(70);
    width: px2rem(70);
    margin: px2rem(45) auto;
    border: px2rem(1) solid #f4f4f4;
    border-radius: 50%;
  }

</style>
