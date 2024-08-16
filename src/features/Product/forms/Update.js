
export default function Update({formik , categories}) {
  return (
    <form onSubmit={formik.handleSubmit}>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Title
      </label>
      <input
        type="text"
        name="title"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      {formik.touched.title && formik.errors.title ? (
        <div className="text-red-500 text-xs">{formik.errors.title}</div>
      ) : null}
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Price
      </label>
      <input
        type="number"
        name="price"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.price}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      {formik.touched.price && formik.errors.price ? (
        <div className="text-red-500 text-xs">{formik.errors.price}</div>
      ) : null}
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Description
      </label>
      <textarea
        name="description"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.description}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      {formik.touched.description && formik.errors.description ? (
        <div className="text-red-500 text-xs">
          {formik.errors.description}
        </div>
      ) : null}
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Category
      </label>
      <select
        name="category_id"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.category_id}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="">Select a category</option>
        {categories?.map((category) => (
          <option key={category.id} value={category.id}>
            {category.title}
          </option>
        ))}
      </select>
      {formik.touched.category_id && formik.errors.category_id ? (
        <div className="text-red-500 text-xs">
          {formik.errors.category_id}
        </div>
      ) : null}
    </div>

    <div className="mb-4">
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Create Product
      </button>
    </div>
  </form>
  )
}
