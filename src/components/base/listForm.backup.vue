<template>
  <form>
    <div v-for="(value, key) in inComingObject" :key="key" :ref="key">
      <div>{{ key }}</div>
      <div v-if="typeof value === 'string'" style="display:flex;"  @touchstart.once="uiEventAgent(key)">
        <input @blur="_validate(key)" :ref="'value-'+key" v-model.lazy="dataMap[key]" :placeholder="value" type="text"></input>
        <div class="space-holder"></div>
      </div>
      <div v-if="typeof value === 'object'" style="display:flex;" @touchstart.once="uiEventAgent(key)">
        <input @blur="_validate(key)" :ref="'value-'+key" v-model.lazy="dataMap[key]" v-if=" (!value.interactiveMode) || value.interactiveMode === 'input-text'" :placeholder="value.placeholder" type="text"></input>
        <input @blur="_validate(key)" :ref="'value-'+key" v-model.lazy.number="dataMap[key]" v-if=" value.interactiveMode === 'input-number' "  type="number"  :placeholder="value.placeholder"></input>
        <select @blur="_validate(key)" :ref="'value-'+key" v-if=" value.interactiveMode === 'select' " v-model="dataMap[key]">
          <option class="select-placeholder" value="" > {{ value.placeholder }} </option>
          <option v-for="item in value.options" :key="item" :value="item">{{ item }}</option>
        </select>
        <div class="icon space-holder">
          <div v-if="value.interactiveMode === 'input-number' && value.numberUnit">{{ value.numberUnit }}</div>
          <div v-if="value.interactiveMode === 'select'">⬇</div>
        </div>
      </div>
    </div>
    <div>
      <input type="number" style="text-align:left;" :placeholder="'请输入验证码：'" v-model="userInputedVCode"></input>
      <div class="text-getVerificationCode" @click="_getVerificationCode(dataMap['手机号码'])">{{ textContentForGetVCode }}</div>
    </div>
    <div ref="hintText" class="hint-text"></div>
  </form>
</template>

<script>
// import {getVerificationCode} from '@/api/verificationCode.js'
import validate from '@/assets/script/validate'

export default {
  methods: {
    initDataMap () {
      this.dataMap = JSON.parse(JSON.stringify(this.inComingObject))
      for (let prop in this.dataMap) {
        this.dataMap[prop] = ''
      }
    },
    uiEventAgent (key) {
      switch (this.$refs['value-' + key][0].localName) {
        case 'select':
          this.$refs['value-' + key][0].querySelector('.select-placeholder').style = 'display: none;'
          break
      }
    },
    _getVerificationCode (phoneNumber) {
      // getVerificationCode(phoneNumber).then((res) => {
      if (this.smsCountDown === null) {
        console.log('验证码已成功发送！')
        this.smsCountDown = setInterval(() => {
          this.smsCountDownTimer = this.smsCountDownTimer - 1
          if (this.smsCountDownTimer === 0) {
            clearInterval(this.smsCountDown)
            this.smsCountDownTimer = 60
            this.smsCountDown = null
          }
        }, 1000)
      } else {
        console.log('您的验证码已发送，请您耐心等待')
      }
      // })
    },
    _validate (keyOfDataMap) {
      let result = validate(this.dataMap[keyOfDataMap], this.inComingObject[keyOfDataMap].dataType)
      this.$refs.hintText.textContent = result[1]
    }
  },
  props: {
    inComingObject: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      dataMap: {},
      userInputedVCode: '',
      smsCountDownTimer: 60,
      smsCountDown: null
    }
  },
  mounted () {
    this.initDataMap()
  },
  computed: {
    textContentForGetVCode () {
      return this.smsCountDown ? `${this.smsCountDownTimer}s后重新发送` : '请获取验证码'
    }
  }

}
</script>


<style lang="scss" scoped>
  $fontSizeOfBodyText: 25;

  form>* {
    @include text-type1($fontSizeOfBodyText);
    @include row-type1(88);
    justify-content: space-between;
    &::after {
      @include line-type1();
    }
    &:last-child::after {
      @include line-type1();
      padding-right: 30%;
    }
  }

  .text-getAuthCode {
    position: absolute;
    margin-left: px2rem(460);
    width: px2rem(200);
    height: px2rem(60);
	  line-height: px2rem(60);
	  border-radius: px2rem(10);
	  border: solid px2rem(1) #bfbfbf;
    color: #005aff;
    text-align: center;
    vertical-align: middle; 
  }

  input {
    color: #bfbfbf;
    text-align: right;
    &:focus {
      color: black;
      font-weight: bold;
    }
  }
  .select-placeholder {
    color: #bfbfbf;
  }

  .space-holder {
    margin-left: px2rem(40);
    width: px2rem(40);
  }
  .hint-text {
    color: red;
    text-align: center;
    font-weight: bold;
  }
</style>
