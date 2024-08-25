import axios_instance from "./config";

export const getRoles = () => {
  return axios_instance.get(`roles`);
};