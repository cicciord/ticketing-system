import { SERVER_URL } from "./constants/server";
import { handleHttpRes } from "./utils/handleHttpRes";

export const getUser = async () => {
  return handleHttpRes(
    fetch(`${SERVER_URL}/sessions/current`, {
      method: "GET",
      credentials: "include",
    }),
  );
};
