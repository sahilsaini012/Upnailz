import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Retrieve the token from localStorage to check if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [token, setToken] = useState(localStorage.getItem("token") || "");
// alert(JSON.stringify(token))


  // Save token and login state to localStorage
  const UserLogin = (token) => {
    localStorage.setItem("token", token);
    localStorage.getItem("token", "token");
    setToken(token);
    setIsLoggedIn(true);
  };

  const UserLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, UserLogin, UserLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};





// import { createContext, useContext, useState } from "react";

// const AuthContext = createContext();
// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(
//     !!localStorage.getItem("isLoggedIn") // Retrieve login state from localStorage
//   );
  
//   // Save login state to localStorage
//   const UserLogin = () => {
//     localStorage.setItem("isLoggedIn", true);
//     setIsLoggedIn(true);
//   };
//   const UserLogout = () => {
//     localStorage.removeItem("isLoggedIn");
//     setIsLoggedIn(false);
//   };
//   return (
//     <AuthContext.Provider value={{ isLoggedIn, UserLogin, UserLogout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// export const useAuth = () => {
//   return useContext(AuthContext);
// };


