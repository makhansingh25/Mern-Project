import { createContext, useContext, useEffect, useState } from "react";

// Create the context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [users, setUsers] = useState(null);

  const storeToken = (serverToken) => {
    console.log("Storing token:", serverToken);
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  const logoutUser = () => {
    console.log("Logging out user and clearing token");
    setToken(null);
    setUsers(null);
    localStorage.removeItem("token");
  };

  const authorizeUser = async () => {
    try {
      const currentToken = localStorage.getItem("token");
      if (!currentToken) {
        setUsers(null);
        return;
      }
      const URL = import.meta.env.VITE_API_URL;

      const response = await fetch(`${URL}/api/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });

      if (response.ok) {
        const user = await response.json();
        setUsers(user.userData);
      } else if (response.status === 401) {
        // Token invalid or expired — logout
        logoutUser();
      } else {
        // For other errors, just clear users but keep token
        setUsers(null);
        console.warn("Authorize user failed with status:", response.status);
      }
    } catch (error) {
      console.error("Frontend error during authorization:", error);
      // Don't logout immediately on network error, just clear users
      setUsers(null);
    }
  };

  // On mount, rehydrate token from localStorage if not set
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && !token) {
      setToken(storedToken);
    }
  }, []);

  // When token changes, authorize user or clear user data
  useEffect(() => {
    console.log("Token changed:", token);
    if (token) {
      authorizeUser();
    } else {
      setUsers(null);
    }
  }, [token]);

  const isLoggedIn = !!token;

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
