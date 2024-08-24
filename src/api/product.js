import axios_instance from "./config";

export const getProducts = (params = {}) => {
  console.log("params",params);
  return axios_instance.get(`products`, {
    params: params,
  });
};
export const getProductById = (product_id) => {
  return axios_instance.get(`products/${product_id}`);
};

export const createProduct = (data) => {
  return axios_instance.post(`products`, data);
};
export const updateProductById = (product_id, data) => {
  return axios_instance.put(`products/${product_id}`, data );
};

export const deleteProductById = (product_id) => {
  return axios_instance.delete(`products/${product_id}`);
};

export const storeImages = (images) => {
  return axios_instance.post(`products/store-images`, images, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
