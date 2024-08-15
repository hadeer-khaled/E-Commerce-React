import axios_instance from "./config";

export const getProducts = (params = {}) => {
  return axios_instance.get(`products`, {
    params: params,
  });
};
export const getProductById = (product_id) => {
  return axios_instance.get(`products/${product_id}`);
};

export const createProduct = (formData) => {
  return axios_instance.post(`products`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const updateProductById = (product_id, formData) => {
  return axios_instance.post(`products/${product_id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteProductById = (product_id) => {
  return axios_instance.delete(`products/${product_id}`);
};

