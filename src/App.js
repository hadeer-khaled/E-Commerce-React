import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import AuthProvider, { useAuth } from "AuthProvider";

/* Pages */
import CreateCategory from "features/Category/pages/Create";
import ShowCategory from "features/Category/pages/Show";
import UpdateCategory from "features/Category/pages/Update";
import ListCategory from "features/Category/pages/List";
import Register from "features/Auth/pages/Register";
import Login from "features/Auth/pages/Login";

/* Layouts */
import UserLayout from 'layouts/UserLayout';

const PrivateRoute = () => {
  const auth = useAuth();
  if (!auth.token) return <Navigate to="/login" />;
  return <Outlet />;
};

const AdminRoute = () => {
  const { user } = useAuth(); 
  console.log(user) 
  if (!user.roles.includes("admin")) {
    return <h1>Not Authorized</h1>;
  }

  return <Outlet />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<h1>Home</h1>} />

            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />

            <Route element={<PrivateRoute />}>
              <Route path="categories">
                <Route index element={<ListCategory />} />
                <Route path=":id/show" element={<ShowCategory />} />
                
                {/* Protecting these routes with AdminRoute */}
                <Route element={<AdminRoute />}>
                  <Route path="create" element={<CreateCategory />} />
                  <Route path=":id/update" element={<UpdateCategory />} />
                </Route>
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
