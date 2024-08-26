import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";

import CreateProductForm from "features/Product/forms/Create";

import { getCategoies } from "api/category";
import { createProduct, storeImages, deleteImages } from "api/product";
import CreateProductSchema from "features/Product/schemas/Create";
import StoreImages from "features/Product/forms/StoreImages";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { saveAs } from "file-saver";
import "App.css";
export default function Create() {
  const imageRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    getCategoies()
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message, { autoClose: 2000 });
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      description: "",
      category_id: "",
    },
    validationSchema: CreateProductSchema,
    onSubmit: (values) => {
      const productData = {
        title: values.title,
        description: values.description,
        price: values.price,
        category_id: values.category_id,
        images: images.map((imagePath) => ({
          original_filename: imagePath.original_filename,
          storage_filename: imagePath.storage_filename,
          url: imagePath.url,
        })),
      };
      createProduct(productData)
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

  const uploadImages = (files) => {
    const ImagesFormData = new FormData();
    files.forEach((image, index) => {
      ImagesFormData.append(`images[${index}]`, image);
    });
    storeImages(ImagesFormData)
      .then((res) => {
        setImages(res.data.images);
        console.log(res.data.images);
        toast.success(res.data.message, { autoClose: 2000 });
      })
      .catch((err) => {
        toast.error(err.response.data.message, { autoClose: 2000 });
      });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    uploadImages(files);
  };
  const handleDeleteImages = (e, index) => {
    if (index === null || index === undefined) {
      deleteImages(images.map((image) => image.storage_filename));
      setImages([]);
      if (imageRef.current) {
        imageRef.current.value = "";
      }
    } else {
      deleteImages([images[index].storage_filename]);
      const updatedImage = [...images];
      updatedImage.splice(index, 1);
      setImages(updatedImage);

      if (updatedImage.length === 0 && imageRef.current) {
        imageRef.current.value = "";
      }
    }
  };

  // const handleDownloadEachImage = (index) => {
  //   fetch(images[index].url, { mode: "no-cors" })
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       console.log(blob);
  //       saveAs(blob, images[index].original_filename);
  //     })
  //     .catch((error) => console.error("Download failed", error));
  // };
  const handleDownloadEachImage = async (fileurl, filename) => {
    fetch(fileurl, { mode: "no-cors" })
      .then((res) => {
        return res.blob();
      })
      .then((blob) => {
        const href = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="card bg-base-100  shadow-xl p-4">
        <div className="card-body">
          <h2 className="card-title">Create Product</h2>
          <StoreImages
            handleImageChange={handleImageChange}
            images={images}
            imageRef={imageRef}
            handleDownloadEachImage={handleDownloadEachImage}
            handleDeleteImages={handleDeleteImages}
          ></StoreImages>
          <CreateProductForm formik={formik} categories={categories} />
        </div>
      </div>
    </>
  );
}
