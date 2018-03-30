<template>
  <div class="page-purchase">
    <div class="paragraph-commodityDescription">
      <div class="title">
        {{ commodityMeta.title }}
        <span :class="$logo"></span>
      </div>
      <div class="bodyText-commodityDescription">
        {{ commodityMeta.introduction }}
      </div>
    </div>
    <div class="paragraph-price">
      <div>
        <span>起购金额</span><span style="color: #c3c1c1;">{{ '¥'+commodityMeta.start_price }}</span>
      </div>
      <div>
        <span>最多购买金额</span><span style="color: #c3c1c1;">{{ '¥'+commodityMeta.remain_amount }}</span>
      </div>
    </div>
    <div class="paragraph-pay">
      <div>
        <span>账户余额</span><span>{{ '¥'+accountBalance }}</span>
      </div>
      <div>
        <span>购买金额</span><input type="number" v-model.number="inputedAmount" placeholder="输入购买金额" />
      </div>
    </div>
    <div class="paragraph-agreement">
      <input type="checkbox" :class="'checkBox '+`${checkBoxState?'checked':''}`" @click="changeCheckboxState"></input>
      <div class="bodyText-agreement">我已经阅读并同意<a download href="/static/doc/投资风险提示书.docx" style="color: #0042ff; text-decoration: none;">《风险提示书》</a>及其他先相关条款和协议，已充分知晓资金的使用说明，并同意支付此资金。</div>
    </div>
    <div class="bar-confirm">
      <div>实付金额：<span style="color:#ff0000;">{{'¥ '+payingAmount}}</span></div>
      <div :class="'link-confirm '+`${confirmButtonState}`" @click="confirmOrder()">确认</div>
    </div>
    <confirm-menu v-show="showRechargeConfirmMenu"
      :textForTitle="'余额不足是否充值'"
      :textForCancel="'取消'"
      :textForConfirm="'充值'"
      @cancel="cancelConfirmMenu"
      @confirm="jumpToRechargePage"
    />
  </div>
</template>

<script>
import api from '@/api'
// import mockApi from '@/api/mock.js'
import confirmMenu from '@/components/base/popMenu-confirm.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    confirmMenu
  },
  methods: {
    ...mapActions([
      'appPrompt'
    ]),
    ...mapMutations([
      'setPopupPromptText'
    ]),
    changeCheckboxState () {
      if (this.checkBoxState) {
        this.checkBoxState = ''
      } else {
        this.checkBoxState = 'checked'
      }
    },
    jumpToRechargePage () {
      this.$router.push('/user/recharge')
    },
    cancelConfirmMenu () {
      this.showRechargeConfirmMenu = false
    },
    confirmOrder () {
      if (this.confirmButtonState !== 'disabled') {
        if (this.accountBalance >= Number(this.payingAmount)) {
          this.dataIsSendingToServer = true
          api.postInvestmentOrder({
            'order': {
              'investment_id': this.commodityMeta.id,
              'amount': this.payingAmount,
              'agreement': true
            }})
          .then(res => {
            if (res.code === 400) {
              this.appPrompt(res.message)
            } else if (res.code === 200) {
              this.appPrompt('购买成功')
              .then(() => {
                this.dataIsSendingToServer = false
                this.$router.push(`/user/orders/invest/${res.id}`)
                // this.initializeData()
              })
            }
          })
        } else {
          this.showRechargeConfirmMenu = true
        }
      }
    },
    initializeData () {
      this.commodityMeta = {}
      this.inputedAmount = 0
      this.checkBoxState = ''
      this.accountBalance = 0
      this.showRechargeConfirmMenu = false
      this.dataIsSendingToServer = false
      // get commodityMeta from server
      api.getInvestmentDetails(this.$route.params.id)
        .then((res) => {
          this.commodityMeta = res
        })
      // get account balance from server
      api.getUserMeta()
        .then(res => {
          this.accountBalance = res.balance
        })
    }
  },
  computed: {
    confirmButtonState () {
      if (this.formDataHadBeenValidated && !this.dataIsSendingToServer) {
        return ''
      } else {
        return 'disabled'
      }
    },
    ...mapGetters([
      'userLogInState'
    ]),
    $logo () {
      switch (this.commodityMeta.investment_type) {
        case 'cf':
          return 'image-众筹'
        case 'collected':
          return 'image-采集'
        case 'single':
          return 'image-投资'
      }
    },
    payingAmount () {
      if (this.inputedAmount > Number(this.commodityMeta.remain_amount)) {
        this.inputedAmount = this.commodityMeta.remain_amount
        return Number(this.commodityMeta.remain_amount)
      } else {
        return this.inputedAmount
      }
    },
    formDataHadBeenValidated () {
      if (
        this.checkBoxState === 'checked' &&
        this.payingAmount >= this.commodityMeta.start_price
      ) {
        return true
      } else {
        return false
      }
    }
  },
  data () {
    return {
      commodityMeta: {},
      inputedAmount: 0,
      checkBoxState: '',
      accountBalance: 0,
      showRechargeConfirmMenu: false,
      dataIsSendingToServer: false
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.userLogInState === 'notLoggedIn') {
        vm.$router.replace(`/user/login?nextPath=${vm.$route.fullPath}`)
      } else {
        vm.initializeData()
      }
    })
  }
}
</script>

<style lang="scss" scoped>
$fontSizeOfBodyText: 25;
  .page-purchase {
    font-size: px2rem($fontSizeOfBodyText);
    background-color: #f7f7f7;
    [class^="paragraph-"] {
      margin: px2rem(30) px2rem(-40);
      padding: 0 px2rem(40);
      background-color: #fff;
    }
    .paragraph-commodityDescription {
      padding: px2rem(28) px2rem(40);
      .title {
        margin-bottom: px2rem(30);
        font-size: px2rem(36);
      }
      .bodyText-commodityDescription {
        color: #777;
      }
    }
    .paragraph-price, .paragraph-pay {
      &>div {
        @include row-type1(100) ;
        border-bottom: px2rem(1) solid #f7f7f7;
        justify-content: space-between;
        input {
          text-align: right;
          &::placeholder {
            color: #c3c1c1;
          }
        }
      }
    }
    .paragraph-agreement {
      padding: px2rem(40) px2rem(35);
      display: flex;
      color: #777;
      justify-content: space-between;
      align-items: center;
      .checkBox {
        height: px2rem(37);
        width: px2rem(37);
        border: px2rem(3) solid #727272;
        &.checked {
          border-color: #008aff;
          background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDcwIDcwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA3MCA3MDsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIzMnB4IiBoZWlnaHQ9IjMycHgiPgo8Zz4KCTxnPgoJCTxnPgoJCQk8cGF0aCBkPSJNMjYuNDc0LDcwYy0yLjE3NiwwLTQuMjM0LTEuMDE4LTUuNTU3LTIuNzY0TDMuMDQ5LDQzLjYzOUMwLjcyNSw0MC41NywxLjMzLDM2LjIsNC4zOTksMzMuODc1ICAgICBjMy4wNzQtMi4zMjYsNy40NDEtMS43MTcsOS43NjYsMS4zNWwxMS43NTIsMTUuNTE4TDU1LjQ3NCwzLjI4NWMyLjAzNS0zLjI2NSw2LjMzMi00LjI2NCw5LjYwNC0yLjIzMiAgICAgYzMuMjY4LDIuMDM0LDQuMjY2LDYuMzM0LDIuMjMsOS42MDJsLTM0LjkxNiw1Ni4wNmMtMS4yMTMsMS45NDktMy4zMDcsMy4xNzUtNS42LDMuMjc5QzI2LjY4NSw2OS45OTgsMjYuNTgsNzAsMjYuNDc0LDcweiIgZmlsbD0iIzBkMTVhOCIvPgoJCTwvZz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K);
          background-position: center center;
          background-size: contain;
        }
      }
      .bodyText-agreement {
        min-height: px2rem(152);
        width: px2rem(620);
        border: px2rem(1) solid #000;
        padding: px2rem(40) px2rem(8);
        border-radius: px2rem(10);
      }
    }

    .bar-confirm {
      position: absolute;
      left: 0; right: 0; bottom: 0;
      padding-left: px2rem(40);
      margin: auto;
      font-size: px2rem(30);
      @include row-type1(100);
      justify-content: space-between;
      background-color: white;
      .link-confirm {
        @include button-type1(100, 300) ;
        border-radius: 0;
      }
    }
  }

  .image-众筹,.image-采集,.image-投资 {
    width: px2rem(98);
    height: px2rem(42);
    background-repeat: no-repeat;
    background-position: top;
  }

</style>
