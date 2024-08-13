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
  console.log("auth: ",auth);
  if (!auth.token) return <Navigate to="/login" />;
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
                <Route path="create" element={<CreateCategory />} />
                <Route path=":id/show" element={<ShowCategory />} />
                <Route path=":id/update" element={<UpdateCategory />} />
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
