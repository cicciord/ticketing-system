import { handleHttpRes } from "./utils/handleHttpRes";
import { SERVER_URL } from "./constants/server";

export const logout = async () => {
  return handleHttpRes(
    fetch(`${SERVER_URL}/sessions/current`, {
      method: "DELETE",
      credentials: "include",
    }),
  );
};
