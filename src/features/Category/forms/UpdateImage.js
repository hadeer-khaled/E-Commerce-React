
export default function UpdateImage({imageFormik,handleImageChange}) {
  return (
    <>
    <form onSubmit={imageFormik.handleSubmit}>
        {/* <div className="avatar">
            <div className="w-24 rounded">
            <img src={formik.values.image} alt='category'/>
            </div>
        </div> */}

        <input
        type="file"
        name="image"
        onChange={handleImageChange}
        className="file-input file-input-bordered file-input-md w-full max-w-xs "  
        />
    <button type="submit" 
            className="btn btn-outline btn-info mt-4">Update Image
    </button>

    </form>

    
    </>
    )
}
