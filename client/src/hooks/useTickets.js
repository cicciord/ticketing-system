import { useState, useEffect } from "react";
import { useUser } from "./useUser";
import { getTickets } from "../api/getTickets";

const useTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  const { isLoggedIn } = useUser();

  useEffect(() => {
    setIsLoading(true);
    getTickets()
      .then((res) => {
        setTickets(res);
        setIsError(false);
      })
      .catch((err) => {
        setError(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isLoggedIn]);

  return { tickets, isLoading, isError, error };
};

export { useTickets };
