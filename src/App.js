import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import AuthProvider, { useAuth } from "AuthProvider";

/* Pages */
import Register from "features/Auth/pages/Register";
import Login from "features/Auth/pages/Login";

import ListCategory from "features/Category/pages/List";
import CreateCategory from "features/Category/pages/Create";
import UpdateCategory from "features/Category/pages/Update";
import ShowCategory from "features/Category/pages/Show";

import ListProduct from "features/Product/pages/List";
import CreateProduct from "features/Product/pages/Create";
import UpdateProduct from "features/Product/pages/Update";
import ShowProduct from "features/Product/pages/Show";

/* Layouts */
import Dashboard from "layouts/Dashboard";
import NotFound from "layouts/NotFound";
import NotAuthorized from "layouts/NotAuthorized";
import Visitor from "layouts/Visitor";
import Home from "layouts/Home";
import ResetPassword from "features/Auth/pages/ResetPassword";
import ForgotPassword from "features/Auth/pages/ForgotPassword";

const PrivateRoute = () => {
  const auth = useAuth();
  if (!auth.token) return <Navigate to="/login" />;
  return <Outlet />;
};

const AdminRoute = () => {
  const { user } = useAuth();
  console.log(user);
  if (!user.roles.includes("admin")) {
    return <NotAuthorized />;
  }

  return <Outlet />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<Visitor />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />}>
              <Route index element={<Home />} />

              <Route path="categories">
                <Route index element={<ListCategory />} />
                <Route path=":id/show" element={<ShowCategory />} />

                <Route element={<AdminRoute />}>
                  <Route path="create" element={<CreateCategory />} />
                  <Route path=":id/update" element={<UpdateCategory />} />
                </Route>
              </Route>

              <Route path="products">
                <Route index element={<ListProduct />} />
                <Route path=":id/show" element={<ShowProduct />} />
                <Route element={<AdminRoute />}>
                  <Route path=":id/update" element={<UpdateProduct />} />
                  <Route path="create" element={<CreateProduct />} />
                </Route>
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
