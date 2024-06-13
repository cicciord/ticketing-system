import { handleHttpRes } from "./utils/handleHttpRes";
import { SERVER_URL } from "./constants/server";

export const closeTicket = async (ticketId) => {
  return handleHttpRes(
    fetch(`${SERVER_URL}/tickets/${ticketId}/close`, {
      method: "PUT",
      credentials: "include",
    }),
  );
};
