// import mockApi from './mock'
import productionApi from './production'

let api

if (process.env.NODE_ENV !== 'production') {
  // api = mockApi
  api = productionApi
} else {
  api = productionApi
}

export default api
