import { handleHttpRes } from "./utils/handleHttpRes";
import { SERVER_URL } from "./constants/server";

export const openTicket = async (ticketId) => {
  return handleHttpRes(
    fetch(`${SERVER_URL}/tickets/${ticketId}/open`, {
      method: "PUT",
      credentials: "include",
    }),
  );
};