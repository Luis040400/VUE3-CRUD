import { MainAPI } from '@/services/mainAxios'

const RESOURCE = 'applications'
export const getAllApplications = () => {
  return MainAPI.get(`/${RESOURCE}`)
}

export const getApplication = (id) => {
  return MainAPI.get(`/${RESOURCE}/${id}`)
}

export const createApplication = (payload) => {
  return MainAPI.post(`/${RESOURCE}`, payload)
}

export const updateApplication = (payload, id) => {
  return MainAPI.put(`/${RESOURCE}/${id}`, payload)
}

export const deleteApplication = (id) => {
  return MainAPI.delete(`/${RESOURCE}/${id}`)
}
