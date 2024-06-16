import { useState } from "react";

import API from "../api";

const useCreateTicket = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  const createTicket = async (ticket) => {
    setIsLoading(true);
    try {
      await API.createTicket(ticket);
      setIsError(false);
      setIsSuccess(true);
    } catch (err) {
      setError(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { createTicket, isSuccess, isLoading, isError, setIsError, error };
};

export { useCreateTicket };
