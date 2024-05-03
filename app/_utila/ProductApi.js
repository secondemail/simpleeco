const { default: axiosClient } = require("./axiosClient")

export const getLatestProducts = () => {
  return axiosClient.get('/products?sort=id:desc&populate=*');
}

export const getProductById = (id) => {
  return axiosClient.get(`/products/${id}?populate=*`);
}

export const getProductsByCategory = (category) => {
  return axiosClient.get(`/products?filters[category][$eq]=${category}&populate=*`);
}