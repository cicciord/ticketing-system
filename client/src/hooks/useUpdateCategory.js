import { useState } from "react";
import API from "../api";

const useUpdateCategory = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  const updateCategory = async (ticketId, category) => {
    setIsLoading(true);
    try {
      await API.updateCategory(ticketId, { category });
      setIsError(false);
      setIsSuccess(true);
    } catch (err) {
      setError(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { updateCategory, isSuccess, isLoading, isError, setIsError, error };
};

export { useUpdateCategory };
