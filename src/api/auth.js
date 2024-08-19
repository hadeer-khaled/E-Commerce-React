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

export const resetPassword = (formData) => {
  return axios_instance.post(`reset-password`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    skipToken: true,
  });
};
export const forgotPassword = (formData) => {
  return axios_instance.post(`forgot-password`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    skipToken: true,
  });
};
