import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "api/auth";
import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();
  const loginAction =  (data) => {
    login(data)
    .then((res) => {
      console.log(res.data?.data);
      setUser(res.data.data);
      setToken(res.data.data.access_token);
      localStorage.setItem("token", res.data.data.access_token);
      toast.success(res.data.message, { autoClose: 2000 })
      navigate("/");
      return;

    })
    .catch((error) => {
        if (error.response.status == 401) {
             toast.error(error.response.data.message, { autoClose: 2000 });
        }
    });
  };

//   const logout = () => {
//     setUser(null);
//     setToken("");
//     localStorage.removeItem("site");
//     navigate("/");
//   };

  return (
    <AuthContext.Provider value={{ token, user, loginAction }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};