import React from 'react'
import {  useFormik } from "formik"
import createCategorySchema from "features/Category/schemas/CreateCategorySchema"
import { toast } from "react-toastify";
import  CreateCategoryForm  from 'features/Category/forms/Create';
import {createCategory} from "api/category"

export default function Create() {
    const formik = useFormik({
        initialValues:{
          title:'',
          image:null
        },

        validationSchema:createCategorySchema,

        onSubmit:(values , actions)=>{
          const formData = new FormData();
          formData.append('title', values.title);
          if(values.image){
              formData.append('image', values.image);
          }
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

      const handleImageChange = (event) => {
        const file = event.currentTarget.files[0];
        formik.setFieldValue('image', file);
       
      };
      return (
        <>
            <div className="card bg-base-100 w-96 shadow-xl  p-10">
                <CreateCategoryForm formik ={formik} handleImageChange ={handleImageChange}></CreateCategoryForm>
            </div>
        </>
      )
}
