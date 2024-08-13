import axios_instance from "./config";

export const getCategoies = (params ={})=>{
    return axios_instance.get(`categories`,{
        params: params
    });
}
export const getCategoryById = (category_id)=>{
    return axios_instance.get(`categories/${category_id}`);
}

export const createCategory = (formData)=>{
    return axios_instance.post(`categories`, formData , {
        headers:{
            "Content-Type": "multipart/form-data",
        }
    });
}
export const updateCategoryById = (category_id, formData)=>{
    return axios_instance.post(`categories/${category_id}` , formData , {
        headers:{
            "Content-Type": "multipart/form-data",
        }
    });
}

export const deleteCategoryById = (category_id)=>{
    return axios_instance.delete(`categories/${category_id}`);
}

export const uploadCategoryImage = (category_id , imageFormData)=>{
    return axios_instance.post(`categories/${category_id}/upload-image`, imageFormData , {
        headers:{
            "Content-Type": "multipart/form-data",
        }
    });
}
