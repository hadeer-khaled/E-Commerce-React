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
export const updateCategoryById = (category_id, updatedCategory)=>{
    return axios_instance.post(`categories/${category_id}`, {...updatedCategory , _method: 'PATCH'});
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
