import { login as apiLogin, register as apiRegister, setAuthToken } from './api'

const TOKEN_KEY = 'ziksir_token'
const USER_KEY = 'ziksir_user'

export const saveAuth = (token, user) => {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user || {}))
  setAuthToken(token)
}

export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const getUser = () => {
  const raw = localStorage.getItem(USER_KEY)
  return raw ? JSON.parse(raw) : null
}

export const removeToken = () => { 
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
  setAuthToken(null) 
}

export const login = async (username, password) => {
  const res = await apiLogin(username, password)
  saveAuth(res.data.token, res.data.user)
  return res
}

export const register = async (name, username, email, password) => {
  const res = await apiRegister(name, username, email, password)
  saveAuth(res.data.token, res.data.user)
  return res
}

// initialize auth header if token exists
setAuthToken(getToken())
