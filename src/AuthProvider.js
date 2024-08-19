import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, logout } from "api/auth";
import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  //   const [user, setUser] = useState(localllStorage.getItem("user") || null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();
  const loginAction = (data) => {
    login(data)
      .then((res) => {
        // console.log("Headers with skipToken:", res.config.headers);
        setUser(res.data.data);
        setToken(res.data.data.access_token);
        localStorage.setItem("user", JSON.stringify(res.data.data));
        localStorage.setItem("token", res.data.data.access_token);
        navigate("/");
        return;
      })
      .catch((error) => {
        if (error.response.status == 401) {
          toast.error(error.response.data.message, { autoClose: 2000 });
        }
      });
  };

  const logoutAction = () => {
    logout({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        // console.log("Headers without skipToken:", res.config.headers);
        setUser(null);
        setToken("");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          console.log(error.response.data.message);
          toast.error(error.response.data.message, { autoClose: 2000 });
        }
      });
  };

  return (
    <AuthContext.Provider value={{ user, token, loginAction, logoutAction }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
