import { createContext, useEffect, useState } from "react";
import API from "../api";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const user = await API.getUser();
        setUser({ id: user.id, username: user.username, admin: user.admin });
        setIsLoggedIn(true);
      } catch (error) {}
    };

    checkLogin();
  }, []);

  const login = async (username, password) => {
    setIsLoading(true);
    try {
      const user = await API.login(username, password);
      setIsError(false);
      setUser({ id: user.id, username: user.username, admin: user.admin });
      setIsLoggedIn(true);
    } catch (error) {
      setError(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await API.logout();
      setIsError(false);
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      setError(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        isLoading,
        isLoggedIn,
        error,
        isError,
        setIsError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
