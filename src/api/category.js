import axios_instance from "./config";

export const getCategoies = ()=>{
    return axios_instance.get('categories');
}
export const getCategoryById = (category_id)=>{
    return axios_instance.get(`categories/${category_id}`);
}

export const createCategory = (newCategory)=>{
    return axios_instance.post(`categories`, newCategory , {
        headers:{
            "Content-Type": "multipart/form-data",
        }
    });
}