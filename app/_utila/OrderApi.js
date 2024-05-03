import axiosClient from './axiosClient';

export const CreateOrder = (data) => {
  return axiosClient.post(`/orders`,data) 
}