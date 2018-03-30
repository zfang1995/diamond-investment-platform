<template>
  <form ref="listForm" :class="'listForm ' + `${doubleColumnMode ? '' : 'singleColumnMode'}`">
    <div v-for="(value, key) in inComingObject" :key="key" 
      :class="'list-item ' + `${itemHeight}`"
    >
      <div v-if="doubleColumnMode" v-html="value.name"></div>
      <label :for="key">
        <div v-if="value.inputType === 'select'">
          <div :ref="key" class="text-placeholder">{{ dataMap[key] ? dataMap[key]: value.placeholder }}</div>
          <select :id="key" v-if=" value.inputType === 'select' " v-model="dataMap[key]" @focus="clearHint()" @change="dateChange(key)">
            <option v-for="item in value.options" :key="item" :value="item">{{ item }}</option>
          </select>
        </div>
        <input :id="key" @focus="clearHint()" v-else-if="value.inputType === 'number'" v-model.trim.number="dataMap[key]" type="number" :placeholder="value.placeholder"></input>
        <input :id="key" @focus="clearHint()" v-else-if="value.inputType === 'tel'" v-model.trim="dataMap[key]" type="tel" :placeholder="value.placeholder"></input>
        <div v-else-if="value.inputType === 'date'">
          <div :ref="key" class="text-placeholder">{{ dataMap[key] ? dataMap[key]: value.placeholder }}</div>
          <input :id="key" @focus="clearHint()" v-model="dataMap[key]" type="date" @change="dateChange(key)"></input>
        </div>
        <input v-else-if="value.inputType === 'password'" :id="key" @focus="clearHint()" v-model.trim="dataMap[key]" type="password" :placeholder="value.placeholder"></input>
        <input :id="key" @focus="clearHint()" v-else v-model.trim="dataMap[key]" type="text" :placeholder="value.placeholder"></input>
        <div v-show="showUnitSpaceHolder" class="icon space-holder">
          <div v-if="value.numberUnit">{{ value.numberUnit }}</div>
          <div v-if="value.inputType === 'select'"><i class="image-downWardArrow"></i></div>
        </div>
        <div class="image-clearContent" v-show="!doubleColumnMode && dataMap[key]"
          @click.stop="clearContent(key)"
        ></div>
      </label>
    </div>
    <div v-if="useVCode" class="paragraph-verificationCode">
      <input type="number" style="text-align:left; display:block;" class="division-random1" :placeholder="'请输入验证码：'" v-model="userInputedVCode" @focus="clearHint()"></input>
      <div class="text-getVerificationCode" @click="sendVerificationCode()" v-html="textContentForGetVCode"></div>
    </div>
    <span class="hint-text">{{ hintText }}</span>
  </form>
</template>

<script>
import validate from '@/assets/script/validate'
import api from '../../api'

export default {
  data () {
    return {
      dataMap: {},
      dataTypesMap: {},
      userInputedVCode: '',
      smsCountDownTimer: 60,
      smsCountDown: null,
      hintText: '',
      showUnitSpaceHolder: false
    }
  },
  props: {
    inComingObject: {
      type: Object,
      default: {}
    },
    doubleColumnMode: {
      type: Boolean,
      default: true
    },
    useVCode: {
      type: Boolean,
      default: true
    },
    itemHeight: {
      type: String,
      default: 'normal'
    }
  },
  computed: {
    textContentForGetVCode () {
      return this.smsCountDown ? `${this.smsCountDownTimer}s后重新发送` : '<span style="color: #005aff;">请获取验证码</span>'
    },
    allDataIsQualified () {

    }
  },
  created () {
    this.initDataMap()
  },
  // beforeUpdate () {
  //   this.initDataMap()
  //   this.$forceUpdate()
  // },
  methods: {
    clearContent (key) {
      this.dataMap[key] = ''
    },
    initDataMap () {
      for (let prop in this.inComingObject) {
        this.dataMap[prop] = ''
        if (this.inComingObject[prop].numberUnit) {
          this.showUnitSpaceHolder = true
        }
      }
    },
    sendVerificationCode () {
      if (this.smsCountDown) {
        // 倒数中
        return
      }
      // 清除提示
      this.clearHint()
      // 验证phone
      let phone = this.dataMap.phone
      let validatePhoneResult = validate(phone, this.inComingObject.phone.rules, this.inComingObject.phone.name)
      if (validatePhoneResult[0]) {
        // 先开始计数
        this.smsCountDown = setInterval(() => {
          this.smsCountDownTimer = this.smsCountDownTimer - 1
          if (this.smsCountDownTimer === 0) {
            clearInterval(this.smsCountDown)
            this.smsCountDownTimer = 60
            this.smsCountDown = null
          }
        }, 1000)
        // 再发请求
        api.sendVCode({phone})
          .then(data => {
            if (data.code === 200) {
              console.log('验证码发送成功')
            } else {
              return Promise.reject(new Error('验证码发送失败'))
            }
          })
          .catch(() => {
            clearInterval(this.smsCountDown)
            this.smsCountDownTimer = 60
            this.smsCountDown = null
            this.showHintText('验证码发送失败，请重试')
          })
      } else {
        this.showHintText(validatePhoneResult[1])
      }
    },
    validate () {
      // 清除提示先
      this.clearHint()
      let result = validate(this._getValidateMap())
      if (!result[0]) {
        this.showHintText(result[1])
      }
      return result
    },
    _getValidateMap () {
      let validateMap = {}
      for (let key in this.inComingObject) {
        validateMap[key] = {
          value: this.dataMap[key],
          name: this.inComingObject[key].name,
          rules: this.inComingObject[key].rules
        }
      }
      return validateMap
    },
    validateVCode () {
      return new Promise((resolve, reject) => {
        let code = this.userInputedVCode
        if (code === '') {
          this.showHintText('请输入验证码')
          reject(new Error())
          return
        }
        let data = {
          phone: this.dataMap.phone,
          code
        }
        api.checkVCode(data)
          .then(data => {
            if (data.code === 200) {
              resolve(data)
              console.log('验证成功')
            } else {
              this.showHintText('验证码错误，请重新填写')
              reject(data)
              console.log('验证失败')
            }
          })
      })
    },
    showHintText (hint) {
      this.hintText = hint
    },
    clearHint () {
      this.hintText = ''
    },
    dateChange (key) {
      // date 响应莫名巨慢 只好这么搞
      this.$refs[key][0].textContent = this.dataMap[key]
    },
    getFormData () {
      let formData = JSON.stringify(this.dataMap)
      return JSON.parse(formData)
    }

  }

}
</script>


<style lang="scss" scoped>
  $fontSizeOfBodyText: 25;
  // .listForm {
  //   label {
  //     display: blcok;
  //   }
  // }

  .listForm>.list-item {
    @include text-type1($fontSizeOfBodyText);
    @include row-type1(88);
    justify-content: space-between;
    line-height: initial;
    &::after {
      @include line-type1();
    }
    &:last-child::after {
      @include line-type1();
      padding-right: 30%;
    }
    &.higher {
      height: px2rem(140);
    }
  }
  .paragraph-verificationCode {
     overflow: visible;
     display: flex;
     justify-content: space-between;
     align-items: center;
     @include text-type1($fontSizeOfBodyText);
     @include row-type1(88);
  }
   .division-random1 {
     flex-grow: 1;
     height: 100%;
     border-bottom: px2rem(2) solid #f4f4f4;
     margin-right: px2rem(20);
   }

  input {
    text-align: right;
    text-align: -webkit-right;
    background-color: transparent;
    &:focus {
      color: black;
      font-weight: bold;
    }
    &::placeholder {
      color: #bfbfbf;
    }
  }
  .text-placeholder {
    color: #bfbfbf;
    text-align: right;
    width: 100%;
  }

  option {
    text-align: right;
  }

  label {
    width: 70%;
    position: relative;
    display: flex;
    justify-content: flex-end;
    input {
      flex-grow: 1;
    }
  }
  .singleColumnMode label {
    width: 100%;
  }
  select,
  input[type="date"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 1;
  }
  input[type="date"]:focus {
    opacity: 1;
  }

  .fake-placeholder {
    color: #bfbfbf;
  }

  .space-holder {
    margin-left: px2rem(40);
    width: px2rem(40);
  }
  .hint-text {
    display: block;
    color: red;
    text-align: center;
    font-weight: bold;
  }
  .text-getVerificationCode {
    border-width: 1px;
    border-color: rgb(191, 191, 191);
    border-style: solid;
    border-radius: px2rem(10);
    right: px2rem(34);
    text-align: center;
    line-height: px2rem(56);
    width: px2rem(200);
    height: px2rem(60);
    top: px2rem(-8);
  }

.image-downWardArrow {
  width: px2rem(36);
  height: px2rem(36);
  margin-top: px2rem(8);
}

.singleColumnMode {
  input, .text-placeholder {
    text-align: left;
  } 
}

.image-clearContent {
  height: px2rem(40);
  width: px2rem(40);
}
</style>
