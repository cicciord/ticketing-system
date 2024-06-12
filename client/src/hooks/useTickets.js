import { useState, useEffect } from "react";
import { useUser } from "./useUser";
import API from "../api";

const useTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  const { isLoggedIn } = useUser();

  useEffect(() => {
    const fetchTickets = async () => {
      setIsLoading(true);
      try {
        const res = await API.getTickets();
        setTickets(res);
        setIsError(false);
      } catch (err) {
        setError(err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, [isLoggedIn]);

  return { tickets, isLoading, isError, error };
};

export { useTickets };
