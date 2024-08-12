import { Formik, useFormik } from "formik"
import createCategorySchema from "features/Category/schemas/CreateCategorySchema"
import {createCategory} from "api/category"
import {uploadCategoryImage} from "api/category"
import { toast ,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Create  = () => {

  const formik = useFormik({
    initialValues:{
      title:'',
      image:null
    },
    validationSchema:createCategorySchema,
    onSubmit:(values , actions)=>{
      const formData = new FormData();
      formData.append('title', values.title);
      if (values.image) {
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
        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
                <label className="input input-bordered flex items-center gap-2">
                  Title
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="ex: Phones"
                      className="grow"
                      />
                  </label>
                  {formik.errors.title && formik.touched.title ? <p>{formik.errors.title}</p> : ""}

                  <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  className="file-input file-input-bordered file-input-md w-full max-w-xs"  
                />

                  <button type="submit" disabled = {Formik.isSubmitting || !formik.isValid}

                  className="btn btn-outline btn-info">Add Category</button>
            </form>

          </div>
        </div>

        <ToastContainer />
    </>
  )
}
export default Create 