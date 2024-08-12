import React from 'react'
import { Formik, useFormik } from "formik"
import createCategorySchema from "features/Category/schemas/CreateCategorySchema"
import { toast ,ToastContainer } from "react-toastify";

export default function Create({formik}) {

  return (
   <>
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
   </>
  )
}
