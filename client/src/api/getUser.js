import { handleHttpRes } from "./utils/handleHttpRes";
import { SERVER_URL } from "./constants/server";

export const getUser = async () => {
  return handleHttpRes(
    fetch(`${SERVER_URL}/sessions/current`, {
      method: "GET",
      credentials: "include",
    }),
  )
}
