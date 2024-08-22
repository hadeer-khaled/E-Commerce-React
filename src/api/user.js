import axios_instance from "./config";

export const getUsers = (params = {}) => {
  return axios_instance.get(`users`, {
    params: params,
  });
};

export const getUserById = (user_id) => {
  return axios_instance.get(`users/${user_id}`);
};

export const createUser = (data) => {
  return axios_instance.post(`users`, data);
};
export const updateUserById = (user_id, data) => {
  return axios_instance.put(`users/${user_id}`, data);
};

export const deleteUserById = (user_id) => {
  return axios_instance.delete(`users/${user_id}`);
};
