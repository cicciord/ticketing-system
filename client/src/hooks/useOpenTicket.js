import { useState } from "react";

import API from "../api";

const useOpenTicket = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  const openTicket = async (ticket) => {
    setIsLoading(true);
    try {
      await API.openTicket(ticket);
      setIsError(false);
      setIsSuccess(true);
    } catch (err) {
      setError(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    openTicket,
    isSuccess,
    setIsSuccess,
    isLoading,
    isError,
    setIsError,
    error,
  };
};

export { useOpenTicket };
