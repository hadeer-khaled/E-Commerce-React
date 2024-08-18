export default function UpdateImage({
  imageFormik,
  handleImageChange,
  imagePreview,
}) {
  return (
    <>
      <form
        onSubmit={imageFormik.handleSubmit}
        className="flex items-center gap-4 mb-5"
      >
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          className="file-input file-input-bordered file-input-md max-w-xs"
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
        <button type="submit" className="btn btn-outline btn-info btn-sm">
          Upload Image
        </button>
      </form>
    </>
  );
}
