import { useEffect, useState } from "react";

import API from "../api";
import { useUser } from "./useUser";

const useAdditionalContents = ({ id, disable }) => {
  const [additionalContents, setAdditionalContents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [updated, setIsUpdated] = useState(true);

  const { isLoggedIn } = useUser();

  useEffect(() => {
    // reset state on logout
    if (!isLoggedIn) {
      setAdditionalContents([]);
      return;
    }

    const fetchAdditionalContents = async () => {
      if (disable || !updated) return;

      setIsLoading(true);
      try {
        const res = await API.getAdditionalContents(id);
        setAdditionalContents(res);
        setIsError(false);
        setIsUpdated(false);
      } catch (err) {
        setError(err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdditionalContents();
  }, [isLoggedIn, refresh, id, disable]);

  // refetch additional contents (needed for updating)
  const refetch = () => {
    setIsUpdated(true);
    setRefresh((prev) => !prev);
  };

  return {
    additionalContents,
    isLoading,
    isError,
    error,
    refetch,
    refresh,
  };
};

export { useAdditionalContents };
