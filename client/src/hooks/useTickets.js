import { useState, useEffect } from "react";

import API from "../api";
import { useUser } from "./useUser";

const useTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [refresh, setRefresh] = useState(false);

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
  }, [isLoggedIn, refresh]);

  const refetch = () => {
    setRefresh((prev) => !prev);
  };

  return { tickets, setTickets, isLoading, isError, error, refetch };
};

export { useTickets };
