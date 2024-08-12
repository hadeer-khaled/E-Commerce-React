const ProductCard= ({product})=> {
  return (
    <>
      <div className="card bg-base-100  shadow-xl">
        <div className="avatar">
          <div className="w-63 rounded">
            <img src={product.image ? product.image : "https://www.naggl.org/global_graphics/default-store-350x350.jpg" } alt='category'/>
          </div>
        </div>
        <div className="card-body">
          <h2 className="card-title">  {product.title}</h2>
          <p> {product.description}</p>
         
        </div>
      </div>
    </>
  );
}
export default ProductCard
