import { Formik, useFormik } from "formik"
import createCategorySchema from "features/Category/schemas/CreateCategorySchema"
import {createCategory} from "api/category"
const Create  = () => {

  const formik = useFormik({
    initialValues:{
      title:''
    },
    validationSchema:createCategorySchema,
    onSubmit:(values , actions)=>{
      console.log(values)
      createCategory(values).then(response=>{
        console.log(response.data)
        actions.resetForm()
      })
    }
  }) ;
  console.log(formik.errors)
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
        {formik.errors.title && formik.touched.title ? <p>{formik.errors.title}</p> : ""}
        <button type="submit" disabled = {Formik.isSubmitting || !formik.isValid} >Add</button>
    </form>
  )
}
export default Create 