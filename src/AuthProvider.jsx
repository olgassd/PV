import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiManager from "../Api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const Go=useNavigate()
  const isLoggedIn = !!token;
  const loginAction = async (data,setmessage) => {
    try {
        const res = await ApiManager.post("/authservice/backend/api/public/token", data);
        setUser(res.data.user);
        setToken(res.data.accessToken);
        localStorage.setItem("site", res.data.accessToken);
        Go("/");
        setmessage("")
    } catch (error) {
        if (error.response && error.response.status === 401) {
            setmessage("Invalid username or password.");
        } else {
            setmessage("An error occurred. Please try again later.");
        }
    }
};

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    Go("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, isLoggedIn,loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
