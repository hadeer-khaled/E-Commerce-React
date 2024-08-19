import { NavLink } from "react-router-dom";
import { useAuth } from "AuthProvider";

const ProductCard = ({ product, deleteHandler }) => {
  const auth = useAuth();
  return (
    <>
      <div className="card bg-base-100  shadow-xl">
        <div className="avatar">
          {product.images ? (
            <div className="w-63 rounded">
              <img
                src={
                  product?.images?.length != 0
                    ? product.images[0]
                    : "https://www.naggl.org/global_graphics/default-store-350x350.jpg"
                }
                alt="product"
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="card-body">
          <h2 className="card-title">
            {" "}
            {product.title} | {product.category}
          </h2>
          <p>{product.price}</p>
          <div className="card-actions justify-end">
            <NavLink className="btn" to={`/products/${product.id}/show`}>
              See details
            </NavLink>
            {auth.user.roles.includes("admin") && (
              <>
                <NavLink
                  className="btn btn-primary"
                  to={`/products/${product.id}/Update`}
                >
                  Edit
                </NavLink>
                <button
                  className="btn btn-error"
                  onClick={() => deleteHandler(product.id)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductCard;
