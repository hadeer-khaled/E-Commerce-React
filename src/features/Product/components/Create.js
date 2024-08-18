import { useEffect, useState } from "react";
import { useFormik } from "formik";

import CreateProductForm from "features/Product/forms/Create";

import { getCategoies } from "api/category";
import { createProduct, storeImages } from "api/product";
import CreateProductSchema from "features/Product/schemas/Create";
import StoreImages from "features/Product/forms/StoreImages";

import StoreImagesSchema from "features/Product/schemas/StoreImages";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [categories, setCategories] = useState([]);
  const [imagePaths, setImagePaths] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    getCategoies()
      .then((response) => {
        setCategories(response.data.data);
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
          toast.success(response.data.message, { autoClose: 1500 });
          setTimeout(() => {
            navigate("/products");
          }, 1500);
        })
        .catch((error) => {
          toast.success(error.response.data.message, { autoClose: 1500 });
        });
    },
  });

  const imageFormik = useFormik({
    initialValues: {
      images: [],
    },
    validationSchema: StoreImagesSchema,

    // onSubmit: (values) => {
    //   console.log(values);

    //   const ImagesFormData = new FormData();
    //   values.images.forEach((image, index) => {
    //     ImagesFormData.append(`images[${index}]`, image);
    //   });
    //   storeImages(ImagesFormData)
    //     .then((res) => {
    //       setImagePaths(res.data.paths);
    //       toast.success(res.data.message, { autoClose: 2000 });
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
  });

  const uploadImages = (files) => {
    const ImagesFormData = new FormData();
    files.forEach((image, index) => {
      ImagesFormData.append(`images[${index}]`, image);
    });
    storeImages(ImagesFormData)
      .then((res) => {
        setImagePaths(res.data.paths);
        toast.success(res.data.message, { autoClose: 2000 });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    imageFormik.setFieldValue("images", files);
    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreview(filePreviews);
    uploadImages(files);
  };

  return (
    <>
      <div className="card bg-base-100  shadow-xl p-4">
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
