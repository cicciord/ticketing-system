import { SERVER_URL } from "./constants/server";
import { handleHttpRes } from "./utils/handleHttpRes";

export const getJWT = async () => {
  return handleHttpRes(
    fetch(`${SERVER_URL}/auth-token`, {
      method: "GET",
      credentials: "include",
    }),
  );
};
