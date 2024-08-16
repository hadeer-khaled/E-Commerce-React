import { useEffect, useState } from "react";
import { useFormik } from "formik";

import CreateProductForm from "features/Product/forms/Create";

import { getCategoies } from "api/category";
import { createProduct, storeImages } from "api/product";
import CreateProductSchema from "features/Product/schemas/Create";
import StoreImages from "../forms/StoreImages";

import StoreImagesSchema from "features/Product/schemas/StoreImages";
import { toast } from "react-toastify";

export default function Create() {
  const [categories, setCategories] = useState([]);
  const [imagePaths, setImagePaths] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  useEffect(() => {
    getCategoies()
      .then((response) => {
        setCategories(response.data.data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      description: "",
      category_id: "",
      paths: [],
    },
    validationSchema: CreateProductSchema,
    onSubmit: (values) => {
      console.log(values);
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("price", values.price);
      formData.append("description", values.description);
      formData.append("category_id", values.category_id);
      imagePaths.forEach((imagePath, index) => {
        formData.append(`paths[${index}]`, imagePath);
      });

      createProduct(formData)
        .then((response) => {
          console.log("Product created successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error creating product:", error);
        });
    },
  });

  const imageFormik = useFormik({
    initialValues: {
      images: [],
    },
    validationSchema: StoreImagesSchema,

    onSubmit: (values) => {
      console.log(imagePreview);

      const ImagesFormData = new FormData();
      values.images.forEach((image, index) => {
        ImagesFormData.append(`images[${index}]`, image);
      });
      storeImages(ImagesFormData)
        .then((res) => {
          setImagePaths(res.data.paths);
          toast.success(res.data.message, { autoClose: 2000 });
          console.log(res.data.paths);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    imageFormik.setFieldValue("images", files);
    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreview(filePreviews);
  };

  return (
    <>
      <div className="card bg-base-100  shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Create Product</h2>
          <StoreImages
            imageFormik={imageFormik}
            handleImageChange={handleImageChange}
            imagePreview={imagePreview}
          ></StoreImages>
          <CreateProductForm formik={formik} categories={categories} />
        </div>
      </div>
    </>
  );
}
