import { handleHttpRes } from "./utils/handleHttpRes";
import { SERVER_URL } from "./constants/server";

export const getTickets = async () => {
  return handleHttpRes(
    fetch(`${SERVER_URL}/tickets`, {
      method: "GET",
      credentials: "include",
    }),
  )
}
