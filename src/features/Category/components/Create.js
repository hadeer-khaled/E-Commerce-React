import React from 'react'
import { Formik, useFormik } from "formik"
import createCategorySchema from "features/Category/schemas/CreateCategorySchema"
import { toast ,ToastContainer } from "react-toastify";
import { createCategoryForm } from 'features/Category/forms/Create';
export default function Create(createCategory) {
    const formik = useFormik({
        initialValues:{
          title:'',
          image:null
        },
        validationSchema:createCategorySchema,
        onSubmit:(values , actions)=>{
          const formData = new FormData();
          formData.append('title', values.title);
          formData.append('image', values.image);
          createCategory(formData)
          .then(response=>{
            toast.success(response.data.message ,{ autoClose: 2000 });
            actions.resetForm()
          })
          .catch(error=>{
            actions.setErrors(error);
          })
        }
      }) ;
  return (
    <>
        <createCategoryForm formik ={formik}></createCategoryForm>
    </>
  )
}
