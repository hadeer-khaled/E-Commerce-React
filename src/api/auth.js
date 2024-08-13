import axios_instance from "./config";
export const register = (formData)=>{
    // return axios_instance.post(`register`, formData);
    return axios_instance.post(`register`, formData , {
        headers:{
            "Content-Type": "multipart/form-data",
        }
    });
}