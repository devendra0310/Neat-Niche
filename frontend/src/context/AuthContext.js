import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isloggedin, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({
    name:'',
    email:''
  });
  const [isLoading, setIsLoading] = useState(true);

  const AuthorizationToken = `Bearer ${token}`;

  const storeTokenLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  const logoutUser = () => {
    setToken("");
    setUser("");
    setIsLoggedIn(false)
    return localStorage.removeItem("token");
  };


  const userAuthentication = async () => {
    try {
        const response = await fetch("/api/v2/me", {
          method: "GET",
          headers: {
            Authorization: AuthorizationToken,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUser({
            name:data?.user?.name,
            email:data?.user?.email
          });
          setIsLoggedIn(data?.success)
        } else {
          console.error("Error fetching user data");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
  };

  useEffect(() => {
    if (token) {
      userAuthentication();
    } else {
      setIsLoading(false); 
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ storeTokenLS, user, AuthorizationToken, logoutUser, isloggedin }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
