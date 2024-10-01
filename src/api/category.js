import axios_instance from "./config";

export const getCategoies = (params = {}) => {
  return axios_instance.get(`categories`, {
    params: params,
  });
};
export const getCategoryById = (category_id) => {
  return axios_instance.get(`categories/${category_id}`);
};

export const createCategory = (formData) => {
  return axios_instance.post(`categories`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const updateCategoryById = (category_id, formData) => {
  return axios_instance.post(`categories/${category_id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteCategoryById = (category_id) => {
  return axios_instance.delete(`categories/${category_id}`);
};

export const uploadCategoryImage = (category_id, imageFormData) => {
  return axios_instance.post(
    `categories/${category_id}/upload-image`,
    imageFormData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const exportCategories = (params = {}) => {
  return axios_instance
    .get("categories/export", {
      params: params,
      responseType: "blob", // Important: tells Axios to handle binary data
    })
    .then((response) => {
      // Create a URL for the file
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a link element for the download
      const link = document.createElement("a");
      link.href = url;

      // Set the filename for the download
      link.setAttribute("download", "category.xlsx");

      // Append the link to the body and trigger the click
      document.body.appendChild(link);
      link.click();

      // Clean up: remove the link and revoke the URL
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error("Error exporting categories:", error);
      alert("Failed to export categories");
    });
};
export const exportCategoriesQueue = (user_id, params = {}) => {
  return axios_instance.get("categories/export", {
    params: {
      ...params,
      user_id: user_id,
    },
  });
};
