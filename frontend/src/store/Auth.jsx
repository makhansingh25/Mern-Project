import { createContext, useContext, useEffect, useState } from "react";

// Create the context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [users, setUsers] = useState(null);

  const storeToken = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };
  const isLoggedIn = !!token;

  const logoutUser = () => {
    setToken("");
    setUsers(null);
    localStorage.removeItem("token");
  };

  const authorizeUser = async () => {
    try {
      const currentToken = localStorage.getItem("token");
      if (!currentToken) return;

      const response = await fetch(`http://localhost:3000/api/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });

      if (response.ok) {
        const user = await response.json();
        setUsers(user.userData);
      } else {
        // Token invalid or expired — clear auth data
        logoutUser();
      }
    } catch (error) {
      console.log("Frontend error:", error);
      logoutUser();
    }
  };

  useEffect(() => {
    if (token) {
      authorizeUser();
    } else {
      setUsers(null);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, users, token, storeToken, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
