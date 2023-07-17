import { api } from './api'

const getAmbulances = () => api.get('/ambulancia')

const createAmbulance = data => api.post('/ambulancia', data)

export const ambulanceService = {
  getAll: getAmbulances,
  post: createAmbulance,
}
