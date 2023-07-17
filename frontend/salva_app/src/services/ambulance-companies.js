import { api } from './api'

const getAmbulanceCompanies = () => api.get('/empresa-ambulancias')

const createAmbulanceCompany = data => api.post('/empresa-ambulancias', data)

export const ambulanceCompaniesService = {
  getAll: getAmbulanceCompanies,
  post: createAmbulanceCompany,
}
