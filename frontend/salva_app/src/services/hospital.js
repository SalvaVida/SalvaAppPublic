import { api } from './api'

const getHospitals = () => api.get('/hospital')

const createHospital = data => api.post('/hospital', data)

export const hospitalService = {
  getAll: getHospitals,
  post: createHospital,
}
