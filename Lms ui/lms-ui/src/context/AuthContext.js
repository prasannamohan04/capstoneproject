import React, { createContext, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    sessionStorage.getItem("loginstatus")
      ? {
          username: sessionStorage.getItem("username"),
          role: sessionStorage.getItem("role")?.toLowerCase(),
          empId: sessionStorage.getItem("empId")
        }
      : null
  );
  const login = (userData) => {
    sessionStorage.setItem("username", userData.username);
    sessionStorage.setItem("role", userData.role.toLowerCase());
    sessionStorage.setItem("empId", userData.empId); 
    sessionStorage.setItem("loginstatus", true);
    setUser({
      username: userData.username,
      role: userData.role.toLowerCase(),
      empId: userData.empId
    });
  };

  const logout = () => {
    sessionStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
