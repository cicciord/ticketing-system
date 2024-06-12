import { useEffect, useState } from "react";
import { useUser } from "./useUser";
import API from "../api";

const useAdditionalContents = (id) => {
  const [additionalContents, setAdditionalContents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  const { isLoggedIn } = useUser();

  useEffect(() => {
    if (!isLoggedIn) {
      setAdditionalContents([]);
      return;
    }

    const fetchAdditionalContents = async () => {
      setIsLoading(true);
      try {
        const res = await API.getAdditionalContents(id);
        setAdditionalContents(res);
        setIsError(false);
      } catch (err) {
        setError(err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdditionalContents();
  }, [isLoggedIn]);

  return { additionalContents, isLoading, isError, error };
};

export { useAdditionalContents };
