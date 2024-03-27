import axios from 'axios'

const HttpClient = axios.create({ baseURL: 'http://localhost:8080/api' })

HttpClient.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'

  if (!config.data) {
    config.data = {}
  }

  const token = localStorage.getItem('accessToken')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default HttpClient
