import axios from 'axios'

function mainApi(baseURL) {
  const API = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' }
  })

  API.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response) {
        console.error('Server responded with an error status code')
        console.error('Response data: ', error.response.data)
        console.error('Response status: ', error.response.status)
        console.error('Response headers: ', error.response.headers)
      } else if (error.request) {
        console.error('Response was not received: ', error.request)
        console.error(error.config)
      } else {
        console.error('Error while setting up the request: ', error.message)
      }
      throw error
    }
  )

  return {
    async get(endpoint, config) {
      const response = await API.get(endpoint, config)
      return response.data
    },

    async post(endpoint, payload, config) {
      const response = await API.post(endpoint, payload, config)
      return response.data
    },
    async put(endpoint, payload, config) {
      const response = await API.put(endpoint, payload, config)
      return response.data
    },
    async patch(endpoint, payload, config) {
      const response = await API.patch(endpoint, payload, config)
      return response.data
    },
    async delete(endpoint, config) {
      const response = await API.delete(endpoint, config)
      return response.data
    }
  }
}

export const MainAPI = mainApi(import.meta.env.VITE_AUTHENTICATOR_URL)
export default mainApi
