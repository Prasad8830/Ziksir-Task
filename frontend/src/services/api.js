import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000' })

export const setAuthToken = (token) => {
  if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  else delete api.defaults.headers.common['Authorization']
}

export const register = (name, username, email, password) => api.post('/api/auth/register', { name, username, email, password })
export const login = (username, password) => api.post('/api/auth/login', { username, password })

export const getNotes = () => api.get('/api/notes')
export const createNote = (data) => api.post('/api/notes', data)
export const updateNote = (id, data) => api.put(`/api/notes/${id}`, data)
export const deleteNote = (id) => api.delete(`/api/notes/${id}`)

export default api
