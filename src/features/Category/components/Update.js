import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useFormik } from "formik";
import createCategorySchema from "features/Category/schemas/CreateCategorySchema";
import { toast } from "react-toastify";
import UpdateCategoryForm from "features/Category/forms/Update";
import UpdateCategoryImage from "features/Category/forms/UpdateImage";
import { updateCategoryById } from "api/category";
import { getCategoryById } from "api/category";
import Loader from "components/Loader/Loader";

export default function UpdateCategoryComponent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

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
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [id]);

  const formik = useFormik({
    initialValues: { title: "" },
    validationSchema: createCategorySchema,

    onSubmit: (values, actions) => {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("title", values.title);
      formData.append("_method", "PUT");
      // formData.forEach((value, key) => {
      //   console.log(key, " : ", value);
      // });
      updateCategoryById(id, formData)
        .then((response) => {
          toast.success(response.data.message, { autoClose: 1500 });
          setTimeout(() => {
            navigate("/categories");
          }, 1500);
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
    setImagePreview(URL.createObjectURL(file));
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="flex flex-wrap mt-4 space-x-4">
        {category.image ? (
          <>
            <p>Old Image</p>
            {
              <img
                src={category.image}
                alt={`Preview`}
                className="w-24 h-24 object-cover border rounded"
              />
            }
          </>
        ) : (
          <>
            <p>No Image for this category</p>
          </>
        )}
      </div>
      <div className="card bg-base-100 shadow-xl  p-10">
        <UpdateCategoryImage
          imageFormik={imageFormik}
          handleImageChange={handleImageChange}
          imagePreview={imagePreview}
        ></UpdateCategoryImage>
        <UpdateCategoryForm formik={formik}></UpdateCategoryForm>
      </div>
    </>
  );
}
