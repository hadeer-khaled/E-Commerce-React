import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useFormik } from "formik";

import UpdateProductForm from "features/Product/forms/Update";

import { getCategoies } from "api/category";
import { updateProductById, getProductById, storeImages } from "api/product";
import CreateProductSchema from "features/Product/schemas/Create";
import StoreImages from "features/Product/forms/StoreImages";

import { toast } from "react-toastify";
import { saveAs } from "file-saver";

export default function Update() {
  const { id } = useParams();
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
        setImages(
          response.data.data.images.map((image) => ({
            ...image,
            is_deleted: false,
          }))
        );
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
    },
    validationSchema: CreateProductSchema,
    onSubmit: (values) => {
      updateProductById(id, prepareUpdatedProductData(values))
        .then((response) => {
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
  const prepareUpdatedProductData = (values) => {
    const deletedImages = [];
    const createdImages = [];
    images?.forEach((image) => {
      if (image.hasOwnProperty("id")) {
        if (image.is_deleted) {
          deletedImages.push(image.id);
        }
      } else {
        createdImages.push({
          original_filename: image.original_filename,
          storage_filename: image.storage_filename,
          url: image.url,
        });
      }
    });

    const productData = {
      _method: "PUT",
      product: {
        id: id,
        title: values.title,
        description: values.description,
        price: values.price,
        category_id: values.category_id,
      },
      images: {
        deleted: deletedImages,
        created: createdImages,
      },
    };

    return productData;
  };

  const uploadImages = (files) => {
    const ImagesFormData = new FormData();
    files.forEach((image, index) => {
      ImagesFormData.append(`images[${index}]`, image);
    });
    storeImages(ImagesFormData)
      .then((response) => {
        setImages([...images, ...response.data.images]);
        toast.success(response.data.message, { autoClose: 2000 });
      })
      .catch((err) => {
        toast.success(err.response.data.message, { autoClose: 2000 });
      });
  };
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    uploadImages(files);
  };

  const handleDeleteImages = (e, index) => {
    let updatedImages = [...images];
    if (index === null || index === undefined) {
      setImages((prevImages) => {
        updatedImages = updatedImages.filter((image) => {
          if (image.hasOwnProperty("id")) {
            image.is_deleted = true;
            return true;
          }
          return false;
        });
        return updatedImages;
      });
    } else {
      setImages((prevImages) => {
        if (updatedImages[index]?.hasOwnProperty("id")) {
          updatedImages[index] = { ...updatedImages[index], is_deleted: true };
        } else {
          updatedImages?.splice(index, 1);
        }

        return updatedImages;
      });
    }

    if (images.length === 0 && imageRef.current) {
      imageRef.current.value = "";
    }
  };

  const handleDownloadImages = () => {
    // imagePreview?.map((image, index) => {
    //   saveAs(image, `image_${index}`);
    // });
  };
  const handleDownloadEachImage = (index) => {
    // saveAs(images[index], `image_${index}`);
  };

  return (
    <>
      <div className="p-4">
        <StoreImages
          handleImageChange={handleImageChange}
          images={images}
          imageRef={imageRef}
          handleDownloadEachImage={handleDownloadEachImage}
          handleDownloadImages={handleDownloadImages}
          handleDeleteImages={handleDeleteImages}
        ></StoreImages>
        <UpdateProductForm formik={formik} categories={categories} />
      </div>
    </>
  );
}

//let terms =[];
//terms = [
//  {"id" : 1 , "url" : "xxxx"},
//  {"id" : 2 , "url" : "xxxx"},
// ]
// terms = [
//  {"id" : 1 , "url" : "xxxx","is_deleted" : true}, xx
//  {"id" : 2 , "url" : "xxxx"},
//  {"url" : "yyyyy"} xx
//]
//
// title , description , terms
// create = [{"title" : "yyyyy", "body" : "www"}]
// update = [{id:1 , title: aaa , body :"asd"}]
// delete = [1,2,3,4]
