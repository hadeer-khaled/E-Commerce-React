import React from "react";
export default function Create({ formik, handleImageChange  , imagePreview}) {
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
        {formik.errors.title && formik.touched.title ? (
          <p className="text-red-500">{formik.errors.title}</p>
        ) : (
          ""
        )}

        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          className="file-input file-input-bordered file-input-md w-full max-w-xs "
        />
        <div className="flex flex-wrap mt-4 space-x-4">
          {imagePreview && (
            <img
              src={imagePreview}
              alt={`Preview`}
              className="w-24 h-24 object-cover border rounded"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting || !formik.isValid}
          className="btn btn-outline btn-info mt-4"
        >
          Add Category
        </button>
      </form>
    </>
  );
}
