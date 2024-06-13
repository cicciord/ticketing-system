import { useState } from "react";
import API from "../api";

const useCloseTicket = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  const closeTicket = async (ticket) => {
    setIsLoading(true);
    try {
      await API.closeTicket(ticket);
      setIsError(false);
      setIsSuccess(true);
    } catch (err) {
      setError(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { closeTicket, isSuccess, isLoading, isError, setIsError, error };
};

export { useCloseTicket };
