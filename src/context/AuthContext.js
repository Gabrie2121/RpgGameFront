// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
import HttpClient from 'src/configs/httpClient'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

        if (storedToken) {
          setLoading(true)
          setLoading(false)
          console.log('deu erro aqui?')

          HttpClient.get('/me')
            .then(async response => {
              console.log(response)
              setLoading(false)
              setUser({
                id: response.data.id,
                role: response.data.role,
                username: response.data.username,
                email: response.data.email
              })
            })
            .catch(e => {
              localStorage.removeItem('userData')
              localStorage.removeItem('accessToken')
              setLoading(true)
              setLoading(false)
              console.log(e)
              router.replace('/login')
              router.reload()
            })
        } else {
          setLoading(false)
        }
      } catch (e) {
        console.log(e)

        localStorage.removeItem('userData')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('accessToken')

        setLoading(false)

        if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
          router.replace('/login')
        }
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params, errorCallback) => {
    axios
      .post(authConfig.loginEndpoint, params)
      .then(async response => {
        window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.token)
        console.log('fez login')

        HttpClient.get('/me').then(res => {
          console.log(res)

          window.localStorage.setItem(
            'userData',
            JSON.stringify({
              id: res.data.id,
              role: res.data.role,
              username: res.data.username,
              email: res.data.email
            })
          )
          console.log('redireciona')
          const redirectURL = '/home'

          router.replace(redirectURL)

          router.reload()
        })
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
