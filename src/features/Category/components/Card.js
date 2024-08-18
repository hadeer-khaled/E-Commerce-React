import { NavLink } from "react-router-dom";

const CategoryCard = ({ category, deleteHandler }) => {
  return (
    <>
      <div className="card bg-base-100  shadow-xl">
        <div className="avatar">
          <div className="w-63 rounded">
            <img
              src={
                category.image
                  ? category.image
                  : "https://www.naggl.org/global_graphics/default-store-350x350.jpg"
              }
              alt="category"
            />
          </div>
        </div>
        <div className="card-body">
          <h2 className="card-title"> {category.title}</h2>
          <div className="card-actions">
            <NavLink className="btn" to={`${category.id}/show`}>
              See products
            </NavLink>
            <NavLink className="btn btn-primary" to={`${category.id}/Update`}>
              Edit
            </NavLink>
            <button
              className="btn btn-error"
              onClick={() => deleteHandler(category.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default CategoryCard;
