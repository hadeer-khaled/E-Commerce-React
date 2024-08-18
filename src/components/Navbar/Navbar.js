import { useAuth } from "AuthProvider";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  return (
    <div className="navbar bg-gray-800 text-white mb-6">
      <div className="flex-1">
        <a
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          daisyUI
        </a>
        <div className="ml-6 flex space-x-4">
          <NavLink
            className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
            to={"/categories"}
          >
            Categories
          </NavLink>
          <NavLink
            className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
            to={"/products"}
          >
            Products
          </NavLink>
        </div>
      </div>
      <div className="flex space-x-4 ml-auto">
        {auth.token ? (
          <>
            <p> {auth.user.name}</p>
            <button
              className="px-3 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700"
              onClick={auth.logoutAction}
            >
              Logout
            </button>
          </>
        ) : (
          ""
        )}

        {!auth.token ? (
          <>
            <NavLink
              className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700"
              to={"/login"}
            >
              Login
            </NavLink>
            <NavLink
              className="px-3 py-2 rounded-md text-sm font-medium bg-green-600 hover:bg-green-700"
              to={"/register"}
            >
              Register
            </NavLink>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Navbar;
