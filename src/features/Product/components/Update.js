import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useFormik } from "formik";

import UpdateProductForm from "features/Product/forms/Update";

import { getCategoies } from "api/category";
import { updateProductById, getProductById, storeImages } from "api/product";
import CreateProductSchema from "features/Product/schemas/Create";
import StoreImages from "features/Product/forms/StoreImages";

import StoreImagesSchema from "features/Product/schemas/StoreImages";
import { toast } from "react-toastify";
export default function Update() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [newImagePaths, setNewImagePaths] = useState([]);
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
    getProductById(id)
      .then((response) => {
        formik.setValues({
          title: response.data.data.title || "",
          price: response.data.data.price || "",
          description: response.data.data.description || "",
          category_id: response.data.data.category_id || "",
        });
        setOldImages(response.data.data.images);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [id]);

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
      formData.append("_method", "PUT");
      newImagePaths.forEach((imagePath, index) => {
        formData.append(`paths[${index}]`, imagePath);
      });

      updateProductById(id, formData)
        .then((response) => {
          console.log("Product created successfully:", response.data.data);
          toast.success(response.data.message, { autoClose: 1500 });
          setTimeout(() => {
            navigate("/products");
          }, 1500);
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

    // onSubmit: (values) => {

    //   const ImagesFormData = new FormData();
    //   values.images.forEach((image, index) => {
    //     ImagesFormData.append(`images[${index}]`, image);
    //   });
    //   storeImages(ImagesFormData)
    //     .then((res) => {
    //       setNewImagePaths(res.data.paths);
    //       toast.success(res.data.message, { autoClose: 2000 });
    //       console.log(res.data.paths);
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
        setNewImagePaths(res.data.paths);
        toast.success(res.data.message, { autoClose: 2000 });
        console.log(res.data.paths);
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
      <div className="p-4">
        <div className="flex flex-wrap mt-4 space-x-4">
          {oldImages.length === 0 ? (
            <p>No Images for this product</p>
          ) : (
            <>
              <p>Old Images</p>
              {oldImages.map((path, index) => (
                <img
                  key={index}
                  src={path}
                  alt={`Preview ${index + 1}`}
                  className="w-24 h-24 object-cover border rounded"
                />
              ))}
            </>
          )}
        </div>

        <StoreImages
          imageFormik={imageFormik}
          handleImageChange={handleImageChange}
          imagePreview={imagePreview}
        ></StoreImages>
        <UpdateProductForm formik={formik} categories={categories} />
      </div>
    </>
  );
}
