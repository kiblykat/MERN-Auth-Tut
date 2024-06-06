import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  //create a user state that is shared Context in all components
  const [user, setUser] = useState(null);

  //login method to pass userData to current user credentials
  const login = (userData) => {
    setUser(userData);
  };

  //logout method to set User back to null
  const logout = () => {
    setUser(null);
  };

  console.log("AuthContext state: ", user);

  //passing the user login and logout functions to wrap App component
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
