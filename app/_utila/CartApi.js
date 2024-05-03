import axiosClient from './axiosClient';

export const addToCart = (data) => {
  return axiosClient.post(`/carts`,data)
}

export const getUserCart = (email) => {
  return axiosClient.get(`/carts?populate[products][populate]=banner&filters[email][$eq]=${email}`)
}

export const deleteUserCart = (id) => {
  return axiosClient.delete(`/carts/${id}`)
}