<template>
  <div class="page-profile">
    <div class="paragraph-0 backgroundImage-userProfile-banner">
      <div class="division-id_10">
        <div class="division-0">
          <div class="division-name">
            <!-- <div class="text-name"></div> -->
            <div :class="`text-CertificationMark ${userMeta.verified?'verified':''}`">
              {{ userMeta.verified ? '已认证' : '未认证' }}
            </div>
          </div>
          <div>{{ userMeta.phone }}</div>
        </div>
      </div>
      <div class="paragraph-opreationsForAccountBalance">
        <div>
          <div class="text-balance">
            {{ userMeta.balance | formatMoney }}
          </div>
          <div>账户余额</div>
        </div>
        <div @click="$router.push('/user/recharge')">
          <div></div>
          <div>充值</div>
        </div>
        <div>
          <div></div>
          <div>提现</div>
        </div>
      </div>
    </div> 
    <div class="paragraph-1">
      <div class="division-id_0">
        <div class="division-class_0" @click="$router.push('/user/orders/loan')">
          <div>
            <div class="image-借款 class_0"></div>
            <div>借款</div>
          </div>
          <div>
            <div>{{ userMeta.loan_amount }}元</div>
            <div class="image-rightWardArrow"></div>
          </div>
        </div>
        <div class="division-class_0" @click="$router.push('/user/orders/invest')">
          <div>
            <div class="image-investment class_0"></div>
            <div>投资</div>
          </div>
          <div>
            <div>{{ userMeta.invest_amount }}元</div>
            <div class="image-rightWardArrow"></div>
          </div>
        </div>
      </div>
      <div class="division-id_1">
        <div class="division-class_0" @click="$router.push('/user/orders/cash')">
          <div>
            <div class="image-realization class_0"></div>
            <div>变现</div>
          </div>
          <div>
            <div>{{ userMeta.cash_amount }}元</div>
            <div class="image-rightWardArrow"></div>
          </div>
        </div>
        <div class="division-class_0" @click="$router.push('/user/consult')">
          <div>
            <div class="image-consult class_0"></div>
            <div>客服</div>
          </div>
          <div>
            <div></div>
            <div class="image-rightWardArrow"></div>
          </div>
        </div>
      </div>
      <div class="division-id_2">
        <div class="division-class_0"  @click="$router.push('/user/otherThings')">
          <div>
            <div class="image-其它 class_0"></div>
            <div>其它</div>
          </div>
          <div>
            <div></div>
            <div class="image-rightWardArrow"></div>
          </div>
        </div>
        <div class="division-class_0" @click="$router.push('/about-us')">
          <div>
            <div class="image-我们 class_0"></div>
            <div>关于</div>
          </div>
          <div>
            <div></div>
            <div class="image-rightWardArrow"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'userLogInState'
    ])
  },
  data () {
    return {
      userMeta: {
        balance: 0,
        loan_amount: 0,
        invest_amount: 0,
        cash_amount: 0,
        phone: ''
      }
    }
  },
  created () {
    api.getUserMeta()
    .then(res => {
      this.userMeta = res
    })
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      setTimeout(() => {
        if (vm.userLogInState === 'notLoggedIn') {
          vm.$router.replace('/user/login?nextPath=/user/profile')
        }
      }, 0)
    })
  }
}
</script>

<style lang="scss" scoped>
.page-profile {
  background-color: #f7f7f7;
  margin-top: 0 !important;
  .paragraph-1 {
    background-color: unset;
  }
  .division-id_10 {
    height: px2rem(135);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .division-name {
      width: 65%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .text-CertificationMark {
      height: px2rem(45.5);
      width: px2rem(120);
      border: px2rem(3) solid #fff;
      border-radius: px2rem(5);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: px2rem(30);
      &.verified {
        border-color: green;
        color: green;
      }
    }
    .division-0 {
      height: 80%;
      width: px2rem(515);
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      color: white;
      font-size: px2rem(35);
    }
  }
  .paragraph-opreationsForAccountBalance {
    margin-top: px2rem(25);
    margin-left: auto;
    margin-right: auto;
    height: px2rem(160);
    width: px2rem(670);
    @include layoutScheme-type1(3, center, fit-content) ;
    border-radius: px2rem(15);
    background-color: white;
    box-shadow: 0px px2rem(10) px2rem(5) 0px rgba(4, 0, 0, 0.1);
    font-size: px2rem(28);
    .text-balance {
      color: #f64a0e;
    }
  }
  .division-id_0, .division-id_1, .division-id_2 {
    margin: 0 px2rem(-40);
    padding: 0 px2rem(40);
    margin-bottom: px2rem(20);
    background-color: white;
  }
  .paragraph-0 {
    height: px2rem(480);
    margin: 0 px2rem(-40);
    padding: 0 px2rem(40);  
    padding-top: px2rem(123);
  }
}
  .division-class_0 {
    height: px2rem(90);
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:first-of-type {
      border-bottom: px2rem(3) solid #f4f4f4;
    }
    &>div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: px2rem(30);
      &:last-child {
        color: #b6b6b6;
        font-size: px2rem(25);
      }
    }
    .image-rightWardArrow {
      margin-left: px2rem(16);
      height: px2rem(24);
      width: px2rem(16);
    }
    .class_0 {
      height: px2rem(50);
      width: px2rem(50);
      margin-right: px2rem(30);
    }
    .image-investment, .image-realization {
      background-image: linear-gradient(270deg, 
  		#2e4fdb 0%, 
  		#16b2ec 100%)
    }
  } 

</style>
