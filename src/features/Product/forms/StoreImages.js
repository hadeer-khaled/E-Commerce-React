export default function StoreImages({
  imageFormik,
  handleImageChange,
  imagePreview,
}) {
  return (
    <>
      <form onSubmit={imageFormik.handleSubmit} className="p-4">
        <div className="">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload Product Images
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              name="images"
              multiple
              onChange={handleImageChange}
              // className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                imageFormik.errors.images ? "border-red-500" : ""
              }`}
            />

            <div className="flex flex-wrap mt-4 space-x-4">
              {imagePreview.map((path, index) => (
                <img
                  key={index}
                  src={path}
                  alt={`Preview ${index + 1}`}
                  className="w-24 h-24 object-cover border rounded"
                />
              ))}
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={!imageFormik.isValid}
            >
              Upload Images
            </button>
            {imageFormik.errors.images && (
              <p className="text-red-500 text-xs italic mt-2">
                You must select at least 1 image before upload it
              </p>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
