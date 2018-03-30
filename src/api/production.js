import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.response.use(function (response) { // 确保这个中间件是最后一个，为了方便使用这里将返回值修改为response.data
  let { data, config } = response
  if (process.env.NODE_ENV !== 'production') {
    if (data.code === 200) {
      console.log(`${config.url} succeed !`, data)
    } else if (data.code === 400) {
      console.log(`${config.url} failed !`, data)
    } else {
      console.log(`${config.url} has no response.code`, data)
    }
  }
  return Promise.resolve(data)
}, function (error) {
  return Promise.reject(error)
})

let productionApi = {
  sendVCode: data => axios.post('/api/v1/user/send_code', data),
  checkVCode: data => axios.post('/api/v1/user/check', data),
  postLoans: data => axios.post('/api/v1/loans', data),
  getUserLoanLogs: () => axios.get('/api/v1/loans'),
  getUserLoanDetails: loanId => axios.get(`/api/v1/loans/${loanId}`),
  postCashOrders: data => axios.post('/api/v1/cash_orders', data),
  getUserCashLogs: () => axios.get('/api/v1/cash_orders'),
  getUserCashDetails: cashId => axios.get(`/api/v1/cash_orders/${cashId}`),
  getInvestmentsInfo: params => axios.get(`/api/v1/investments`, {params}),
    // type === '' || 'collected' || 'single' || 'cf'
    // order === '' || `start_date-${desc || asc}` || `total_amount-${desc || asc}` || `expected_profit-${desc || asc}`
  getInvestmentDetails: investmentId => axios.get(`/api/v1/investments/${investmentId}`),
    // typeof investmentId === 'string'
  getInvestmentOrderDetails: orderId => axios.get(`/api/v1/orders/${orderId}`),
  // typeof orderId === 'string'
  getUserInvestmentsLogs: () => axios.get('/api/v1/orders'),
  getUserInvestmentDetails: investmentId => axios.get(`/api/v1/orders/${investmentId}`),
    // typeof investmentId === 'string'
  postInvestmentOrder: (params) => axios.post('/api/v1/orders', params),
  getHomepageInfo: () => axios.get('/api/v1/home'),
  userSignOut: () => axios.delete('/api/v1/user/sign_out'),
  postDeposit: params => axios.post('/api/v1/user/deposit', params),
    // {
    // "deposit_order": {
    //   "bank_number": "666622222",
    //   "amount": 10000,
    //   "phone": "13344442222",
    //   "code": "555222"
    //   }
    // }
  getUserDeposit_orders: () => axios.get('/api/v1/user/deposit'),
  postWithdraw: params => axios.post('/api/v1/user/withdraw', params),
    // {
      // "withdraw_order": {
        // "bank_number": "666622222",
          // "amount": 10000,
            // "phone": "13344442222",
              // "code": "555222"
      // }
    // }
  getWithdraw_orders: () => axios.get('/api/v1/user/withdraw'),
  getUserMeta: () => axios.get('/api/v1/user'),
  getInvestEvents: params => axios.get('/api/v1/events', {params})
  // type === '' || 'collected' || 'single' || 'cf'
}

export default productionApi
