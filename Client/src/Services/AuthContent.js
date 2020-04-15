import React, { createContext, useState, useEffect } from "react";
import AuthService from "./AuthService";

export const AuthContext = createContext();

export default ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setisLoaded] = useState(null);

  useEffect(() => {
    AuthService.isAuthenticated().then((data) => {
      setUser(data.user);
      setRole(data.role);
      setIsAuthenticated(data.isAuthenticated);
      setisLoaded(true);
    });
  }, []);

  return (
    <div>
      {!isLoaded ? (
        <h1>
          Loading: If this meesage is still loading after a few mins, then
          please check if the sever running. Thanks
        </h1>
      ) : (
        <AuthContext.Provider
          value={{
            user,
            setUser,
            role,
            setRole,
            isAuthenticated,
            setIsAuthenticated,
          }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  );
};
