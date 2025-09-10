
import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ nameuser: "ضيف" });
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ nameuser: decoded.username });
      } catch (err) {
        console.error("خطأ في التوكن", err);
        setUser({ nameuser: "ضيف" });
      }
    } else {
      setUser({ nameuser: "ضيف" });
    }
  }, []); 

  const login = (userData, token) => {
    localStorage.setItem("token", token); 
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser({ nameuser: "ضيف" });
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);