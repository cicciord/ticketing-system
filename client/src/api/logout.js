import { SERVER_URL } from "./constants/server";
import { handleHttpRes } from "./utils/handleHttpRes";

export const logout = async () => {
  return handleHttpRes(
    fetch(`${SERVER_URL}/sessions/current`, {
      method: "DELETE",
      credentials: "include",
    }),
  );
};
