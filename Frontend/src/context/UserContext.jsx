import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    email: "",
    profilePicture: "https://via.placeholder.com/100", // Default profile pic
  });

  

  const handleUpdateUser = (userData) => {
    setCurrentUser((prev) => ({ ...prev, ...userData }));
  };

  return (
    <UserContext.Provider value={{ currentUser, handleUpdateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);