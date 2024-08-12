import React from 'react'
export default function Update({formik }) {

  return (
   <>
    <form onSubmit={formik.handleSubmit}>
      <div className='mb-4'>
        <label className="input input-bordered flex items-center gap-2">
            Title: 
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
          {formik.errors.title && formik.touched.title ? <p className="text-red-500">{formik.errors.title}</p> : ""}
      </div>


    <button type="submit" 
            disabled = {!formik.isValid}
            className="btn btn-outline btn-info mt-4">Update Category
    </button>
    
    </form>
   </>
  )
}
