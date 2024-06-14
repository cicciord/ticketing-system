import { handleHttpRes } from "./utils/handleHttpRes";
import { SERVER_URL } from "./constants/server";

export const getJWT = async () => {
  return handleHttpRes(
    fetch(`${SERVER_URL}/auth-token`, {
      method: "GET",
      credentials: "include",
    }),
  );
};
