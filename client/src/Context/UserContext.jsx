import { createContext, useState } from "react";
import { logIn } from "../api/login";
import { useUser } from "../hooks/useUser";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (username, password) => {

    setIsLoggingIn(true);
    try {
      const user = await logIn(username, password);
      setUser({ username: user.username, admin: user.admin });
      setIsLoggedIn(true);
    } catch (error) {
      throw error;
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, login, isLoggingIn, isLoggedIn }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
