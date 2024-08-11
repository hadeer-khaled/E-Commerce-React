import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";

import createCategorySchema from "features/Category/schemas/CreateCategorySchema"
import {UpdateCategoryById} from "api/category"
import {getCategoryById} from "api/category"

import { Formik, useFormik } from "formik"
const Update  = () => {
  const {id} = useParams()
  const [category , setCategory] = useState(null)

  
  const formik = useFormik({
    initialValues:{
      title:''
    },
    validationSchema:createCategorySchema,
    onSubmit:(values)=>{
      UpdateCategoryById(id, values).then(response=>{
        console.log(response.data)
      })
    }
  }) ;

  useEffect(()=>{
    getCategoryById(id)
    .then(response => {
      setCategory(response.data.data)
      formik.setValues({
        title: response.data.data.title || '',
      });
    })
    .catch(error => {
        console.error('Error fetching categories:', error);
    });
  } , [id])
  

  console.log(formik.errors)
  if (!category) {
    return <div>Loading...</div>; 
  }
  return (
    <form onSubmit={formik.handleSubmit}>
      <label>Title</label>
      <input
        id="title"
        name="title"
        type="text"
        value={formik.values.title}
        onChange={formik.handleChange}

        placeholder="ex: Phones"
        />
        {formik.errors.title  ? <p>{formik.errors.title}</p> : ""}
        <button type="submit" disabled = {Formik.isSubmitting || !formik.isValid} >Edit</button>
    </form>
  )
}
export default Update 