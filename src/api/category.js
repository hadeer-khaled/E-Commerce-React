import axios_instance from "./config";

export const getCategoies = ()=>{
    return axios_instance.get('categories');
}