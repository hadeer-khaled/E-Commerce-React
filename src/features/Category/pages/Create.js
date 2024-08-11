import { Formik, useFormik } from "formik"
import createCategorySchema from "features/Category/schemas/CreateCategorySchema"
import {createCategory} from "api/category"
import { toast ,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Create  = () => {

  const formik = useFormik({
    initialValues:{
      title:''
    },
    validationSchema:createCategorySchema,
    onSubmit:(values , actions)=>{
      createCategory(values)
      .then(response=>{
        toast.success(response.data.message ,{ autoClose: 2000 });
        actions.resetForm()
      })
      .catch(error=>{
        actions.setErrors(error.response.data.errors);

      })
    }
  }) ;
  return (
    <form onSubmit={formik.handleSubmit}>
      <label>Title</label>
      <input
        id="title"
        name="title"
        type="text"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="ex: Phones"

        />
        {formik.errors.title && formik.touched.title ? <p>{formik.errors.title}</p> : ""}
        <button type="submit" disabled = {Formik.isSubmitting || !formik.isValid} >Add</button>
        <ToastContainer />
    </form>
  )
}
export default Create 