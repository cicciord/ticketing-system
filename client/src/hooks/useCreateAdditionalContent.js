import { useState } from "react";

import API from "../api";

const useCreateAdditionalContent = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  const createAdditionalContent = async (ticketId, additionalContent) => {
    setIsLoading(true);
    try {
      await API.createAdditionalContent(ticketId, additionalContent);
      setIsError(false);
      setIsSuccess(true);
    } catch (err) {
      setError(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setIsSuccess(false);
    setIsError(false);
    setError(null);
  };

  return {
    createAdditionalContent,
    isSuccess,
    isLoading,
    isError,
    setIsError,
    error,
    reset,
  };
};

export { useCreateAdditionalContent };
