import { FaDownload } from "react-icons/fa6";

export default function StoreImages({
  imageFormik,
  handleImageChange,
  // imagePreview,
  images,
  imageRef,
  handleDownloadImages,
  handleDownloadEachImage,
  handleDeleteImages,
  handleDeleteEachImage,
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
              className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                imageFormik.errors.images ? "border-red-500" : ""
              }`}
            />

            <div className="flex flex-wrap mt-4 space-x-4">
              {images.map((image, index) => (
                <div key={index} className="relative w-24 h-24">
                  <button
                    type="button"
                    className="btn btn-circle btn-sm absolute top-1 right-1 z-10"
                    onClick={() => {
                      handleDeleteImages(index);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="btn btn-circle btn-sm absolute top-1 left-1 z-10"
                    onClick={() => {
                      handleDownloadEachImage(index);
                    }}
                  >
                    <FaDownload />
                  </button>

                  <img
                    src={image.url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover border rounded"
                  />
                </div>
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
              Delete all Images
            </button>
            <button
              type="button"
              className="btn"
              onClick={handleDownloadImages}
            >
              Download all Images
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
