// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './assets/style/imageSets.scss'
import './assets/modules/hotcss/hotcss'
import './assets/modules/swiper/swiper.min.css'
import moment from 'moment'
import formatMoney from './assets/script/formatMoney'
import VueAwesomeSwiper from 'vue-awesome-swiper'

moment.locale('zh-cn')
Object.defineProperty(Vue.prototype, '$moment', { value: moment })
Vue.config.productionTip = false

// register components
Vue.use(VueAwesomeSwiper, {
  autoplay: {
    disableOnInteraction: false
  },
  loop: true,
  pagination: {
    el: '.swiper-pagination'
  }
})
// register filters
Vue.filter('timeLeft', (targetTime, baseTime) => {
  let leftTime = (new Date(targetTime)).getTime() - (new Date(baseTime)).getTime()
  return `${moment(leftTime).format('D[天]H[小时]m[分]s[秒]')}`
})
Vue.filter('formatMoney', (number, unit, unitOfOutput) => {
  return formatMoney(number, unit, unitOfOutput).toString()
})
Vue.filter('formatDate', (time) => {
  return moment(time).format('LL')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  store,
  components: { App }
})
