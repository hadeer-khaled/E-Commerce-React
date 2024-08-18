export default function StoreImages({
  imageFormik,
  handleImageChange,
  imagePreview,
  handleDeleteImages,
  imageRef,
}) {
  return (
    <>
      <form onSubmit={imageFormik.handleSubmit}>
        <div className="">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload Product Images
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              name="images"
              accept="image/*"
              ref={imageRef}
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
            {imageFormik.errors.images && (
              <p className="text-red-500 text-xs italic mt-2">
                You must select at least 1 image before upload it
              </p>
            )}
            <button
              type="button"
              className="btn btn-error"
              onClick={handleDeleteImages}
            >
              Delete Images
            </button>
            <button type="button" className="btn">
              Download Images
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
