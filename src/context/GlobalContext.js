"use client"; // Enable client-side rendering for context

import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const GlobalContext = createContext();

// Provider component
export const GlobalProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("isLogin") &&
      localStorage.getItem("isLogin") === "1"
    ) {
      setIsLogin(localStorage.getItem("isLogin"));
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  const handleClearStorage = () => {
    localStorage.clear("user_access_token");
    localStorage.clear("admin_access_token");
    localStorage.clear("user");
    localStorage.setItem("isLogin", 0);
    setIsLogin("0");
  };
  const handleSetLogin = () => {
    setIsLogin("1");
  };

  return (
    <GlobalContext.Provider
      value={{
        isLogin,
        setIsLogin,
        handleClearStorage,
        handleSetLogin,
        user,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook for consuming the global state
export const useGlobalContext = () => useContext(GlobalContext);
