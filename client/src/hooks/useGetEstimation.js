import { useState } from "react";

import API from "../api";
import { useUser } from "./useUser";

const useGetEstimation = () => {
  const [estimation, setEstimation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  const { token, getToken } = useUser();

  const estimate = async (title, category) => {
    if (!token) {
      // If there is no token, we need to get a new one
      setIsLoading(true);
      try {
        const token = await getToken();
        const res = await API.getEstimation(token, title, category);
        setEstimation(res.estimation);
        setIsError(false);
      } catch (err) {
        setError(err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    } else {
      // If there is a token, we can use it to get the estimation
      setIsLoading(true);
      try {
        const res = await API.getEstimation(token, title, category);
        setEstimation(res.estimation);
        setIsError(false);
        setIsLoading(false);
        return;
      } catch (err) {
        try {
          // If the token is invalid, we need to get a new one
          const token = await getToken();
          const res = await API.getEstimation(token, title, category);
          setEstimation(res.estimation);
          setIsError(false);
        } catch (err) {
          setError(err);
          setIsError(true);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return { estimate, estimation, setEstimation, isLoading, isError, error };
};

export { useGetEstimation };
