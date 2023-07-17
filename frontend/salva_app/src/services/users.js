import { api } from './api'

const getUsers = () => api.get('/users')

const createUser = data => api.post('/users', data)

export const usersService = {
  get: getUsers,
  create: createUser,
}
