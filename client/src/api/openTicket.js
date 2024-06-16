import { SERVER_URL } from "./constants/server";
import { handleHttpRes } from "./utils/handleHttpRes";

export const openTicket = async (ticketId) => {
  return handleHttpRes(
    fetch(`${SERVER_URL}/tickets/${ticketId}/open`, {
      method: "PUT",
      credentials: "include",
    }),
  );
};
