import { api } from './api'

const getSchedules = () => api.get('/agendamento')

const createScheduling = data => api.post('/agendamento', data)

export const schedulingService = {
  getAll: getSchedules,
  create: createScheduling,
}
