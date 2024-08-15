import { NavLink } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <>
      <div className="card bg-base-100  shadow-xl">
        <div className="avatar">
          <div className="w-63 rounded">
            <img
              src={
                product.images.length != 0
                  ? product.images[0]
                  : "https://www.naggl.org/global_graphics/default-store-350x350.jpg"
              }
              alt="product"
            />
          </div>
        </div>
        <div className="card-body">
          <h2 className="card-title">
            {" "}
            {product.title} | {product.category}
          </h2>
          <p>{product.price}</p>
          <div className="card-actions justify-end">
            <NavLink className="btn" to={`${product.id}/show`}>
              See details
            </NavLink>
            <NavLink className="btn btn-primary" to={`${product.id}/Update`}>
              Edit
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductCard;
