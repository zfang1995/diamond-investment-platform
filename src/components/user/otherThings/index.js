import Vue from 'vue'
import Router from 'vue-router'
// loan
import entryPageForLoan from '@/components/loan/entryPage.vue'
import formPageForRequestALoan from '@/components/loan/formPageForRequestALoan/formPageForRequestALoan.vue'
import telephoneCallbackPageForLoan from '@/components/loan/telephoneCallbackPage/telephoneCallbackPage.vue'
// realization
import entryPageForRealization from '@/components/realization/entryPage.vue'
import formPageForRequestRealization from '@/components/realization/formPageForRequestRealization/formPageForRequestRealization.vue'
import telephoneCallbackPageForRealization from '@/components/realization/telephoneCallbackPage/telephoneCallbackPage.vue'
// invest
import entryPageForInvest from '@/components/invest/entryPage.vue'
import pageForNewest from '@/components/invest/page-newest/page-newest.vue'
import pageForInvestments from '@/components/invest/page-investments/page-investments.vue'
import pageForCrowdfunding from '@/components/invest/page-crowdfunding/page-crowdfunding.vue'
import pageForCollect from '@/components/invest/page-collect/page-collect.vue'
import pageForPredict from '@/components/invest/page-predict/page-predict.vue'
import pageForInvestmentDetails from '@/components/invest/page-investment-details/page-investment-details.vue'
import pageForProjectDetails from '@/components/invest/page-projectDetails/page-projectDetails.vue'
import pageForInvestmentScheme from '@/components/invest/page-investmentScheme/page-investmentScheme.vue'
// user
  // login
import userLoginPage from '@/components/user/page-login/page-login.vue'
import pageForUserPasswordRetake from '@/components/user/page-passwordRetake/page-passwordRetake.vue'
  // purchase
import purchasePage from '@/components/user/purchase/page-purchase.vue'
import rechargePage from '@/components/user/purchase/page-recharge.vue'
  // profile
import userProfile from '@/components/user/profile/page-profile.vue'
  // consult
import consultPage from '@/components/user/page-consult/page-consult.vue'
  // otherThings
import otherThingsPage from '@/components/user/otherThings/page-otherThings.vue'
import appointmentToInvestmentPage from '@/components/user/otherThings/page-appointmentToInvestment.vue'
import noticeAfterInvestPage from '@/components/user/otherThings/page-noticeAfterInvest.vue'
import realNameRegistrationPage from '@/components/user/otherThings/page-realNameRegistration.vue'
import riskNoticePage from '@/components/user/otherThings/page-riskNotice.vue'

// test
import arrayElementsTest from '@/components/base/testArrayElements.vue'
import testApi from '@/components/base/test-api.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/test-api',
      component: testApi
    },
    {
      path: '/',
      redirect: '/loan'
    },
    {
      path: '/loan',
      component: {template: '<router-view />'},
      children: [
        {
          path: '',
          component: entryPageForLoan,
          meta: {siteBottomNav: true}
        },
        {
          path: 'form',
          component: formPageForRequestALoan,
          meta: {backToPath: '/loan'}
        },
        {
          path: 'waitCallback',
          component: telephoneCallbackPageForLoan,
          meta: {backToPath: '/loan'}
        }
      ]
    },
    {
      path: '/realization',
      component: {template: '<router-view />'},
      children: [
        {
          path: '',
          component: entryPageForRealization,
          meta: { siteBottomNav: true }
        },
        {
          path: 'form',
          component: formPageForRequestRealization,
          meta: {backToPath: '/realization'}
        },
        {
          path: 'waitCallback',
          component: telephoneCallbackPageForRealization,
          meta: {backToPath: '/realization'}
        }
      ]
    },
    {
      path: '/invest',
      component: entryPageForInvest,
      children: [
        // {
        //   path: '',
        //   component: { template: '<router-view />' },
        //   meta: { siteBottomNav: true }
        // },
        {
          path: 'newest',
          component: pageForNewest,
          meta: { siteBottomNav: true }
        },
        {
          path: 'investments',
          component: pageForInvestments,
          meta: { siteBottomNav: true }
        },
        {
          path: 'crowdfunding',
          component: pageForCrowdfunding,
          meta: { siteBottomNav: true }
        },
        {
          path: 'collect',
          component: pageForCollect,
          meta: { siteBottomNav: true }
        },
        {
          path: 'predict',
          component: pageForPredict,
          meta: { siteBottomNav: true }
        }
      ]
    },
    {
      path: '/investment/:investType/:id',
      component: pageForInvestmentDetails,
      meta: { backToPath: '/invest' },
      children: [
        {
          path: '',
          redirect: 'project-details',
          meta: {backToPath: '/invest'}
        },
        {
          path: 'project-details',
          component: pageForProjectDetails,
          meta: {backToPath: '/invest'}
        },
        {
          path: 'investment-scheme',
          component: pageForInvestmentScheme,
          meta: {backToPath: '/invest'}
        }
      ]
    },
    {
      path: '/user',
      component: { template: '<router-view />' },
      children: [
        {
          path: 'login',
          component: userLoginPage,
          meta: {couldCloseThisPage: true}
        },
        {
          path: 'passwordRetake',
          component: pageForUserPasswordRetake,
          meta: {couldCloseThisPage: true}
        },
        {
          path: 'purchase/:id',
          component: purchasePage
        },
        {
          path: 'recharge',
          component: rechargePage
        },
        {
          path: 'profile',
          component: userProfile,
          meta: { siteBottomNav: true, couldCloseThisPage: true }
        },
        {
          path: 'consult',
          component: consultPage,
          meta: { pageName: '客服热线' }
        },
        {
          path: 'otherThings',
          component: otherThingsPage,
          meta: { pageName: '其他' }
        },
        {
          path: 'appointmentToInvestment',
          component: appointmentToInvestmentPage,
          meta: {pageName: '预约投资'}
        },
        {
          path: 'noticeAfterInvest',
          component: noticeAfterInvestPage,
          meta: { pageName: '投后须知' }
        },
        {
          path: 'realNameRegistration',
          component: realNameRegistrationPage,
          meta: { pageName: '实名注册' }
        },
        {
          path: 'riskNotice',
          component: riskNoticePage,
          meta: { pageName: '风险须知' }
        }
      ]
    },
    {
      path: '/testA',
      component: arrayElementsTest
    }
  ]
})
