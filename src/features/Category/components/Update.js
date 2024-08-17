import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useFormik } from "formik";
import createCategorySchema from "features/Category/schemas/CreateCategorySchema";
import { toast } from "react-toastify";
import UpdateCategoryForm from "features/Category/forms/Update";
import UpdateCategoryImage from "features/Category/forms/UpdateImage";
import { updateCategoryById } from "api/category";
import { getCategoryById } from "api/category";

export default function UpdateCategoryComponent() {
  const { id } = useParams();

  const [category, setCategory] = useState(null);

  const formik = useFormik({
    initialValues: { title: "" },
    validationSchema: createCategorySchema,

    onSubmit: (values, actions) => {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("title", values.title);
      formData.append("_method", "PUT");
      formData.forEach((value, key) => {
        console.log(key, " : ", value);
      });
      updateCategoryById(id, formData)
        .then((response) => {
          toast.success(response.data.message, { autoClose: 2000 });
        })
        .catch((error) => {
          toast.error(error.response.data.message, { autoClose: 2000 });

          actions.setErrors(error);
        });
    },
  });

  const imageFormik = useFormik({
    initialValues: { image: null },
    onSubmit: (values, actions) => {
      const formData = new FormData();
      formData.append("_method", "PUT");
      if (values.image) {
        formData.append("image", values.image);
      }
      updateCategoryById(id, formData)
        .then((response) => {
          toast.success(response.data.message, { autoClose: 2000 });
        })
        .catch((error) => {
          actions.setErrors(error);
        });
    },
  });

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    imageFormik.setFieldValue("image", file);
    console.log(file);
  };

  useEffect(() => {
    getCategoryById(id)
      .then((response) => {
        setCategory(response.data.data);
        formik.setValues({
          title: response.data.data.title || "",
        });
        imageFormik.setValues({
          image: response.data.data.image || "",
        });
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [id]);

  if (!category) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="card bg-base-100 w-96 shadow-xl  p-10">
        <UpdateCategoryForm formik={formik}></UpdateCategoryForm>
        <UpdateCategoryImage
          imageFormik={imageFormik}
          handleImageChange={handleImageChange}
        ></UpdateCategoryImage>
      </div>
    </>
  );
}
