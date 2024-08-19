import axios_instance from "./config";

export const register = (formData) => {
  return axios_instance.post(`register`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    skipToken: true,
  });
};

export const login = (formData) => {
  return axios_instance.post(`login`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    skipToken: true,
  });
};

export const logout = (config) => {
  return axios_instance.post(`logout`, null, config);
};
