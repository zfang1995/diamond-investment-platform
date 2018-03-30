
let mockApi = {
  getPredict: params => {
    let succ = true
    return mockResponse(succ, {
      image: '/static/picture/diamond-1.png'
    })
  },
  sendVCode: params => {
    let succ = true
    // succ = false
    return mockResponse(succ)
  },
  checkVCode: params => {
    let succ = true
    // succ = false
    return mockResponse(succ)
  },
  postLoans: params => {
    let succ = true
    // succ = false
    return mockResponse(succ, {
      code: 200,
      status: 'success',
      message: '创建成功，等待电话',
      id: 'aabbccddeeffssd'
    }, {
      code: 400,
      status: 'fail',
      message: '创建失败'
    })
  },
  postCashOrders: (succ, params) => {
    // let succ = true
    // succ = false
    return mockResponse(succ, {
      code: 200,
      status: 'success',
      message: '创建成功，等待电话',
      id: 'aabbccddeeffssd'
    }, {
      code: 400,
      status: 'fail',
      message: '创建失败'
    })
  }
}

function mockResponse (
  isSucc,
  succRes = {
    code: 200,
    status: 'success'
  },
  errRes = {
    code: 400,
    status: 'fail'
  }
) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(isSucc ? succRes : errRes)
    }, 1500)
  })
}

export default mockApi
