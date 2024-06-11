import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

export const useUser = () => {
  return useContext(UserContext);
};
