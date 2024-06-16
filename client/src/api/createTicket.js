import { SERVER_URL } from "./constants/server";
import { handleHttpRes } from "./utils/handleHttpRes";

export const createTicket = async (ticketData) => {
  return handleHttpRes(
    fetch(`${SERVER_URL}/tickets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticketData),
      credentials: "include",
    }),
  );
};
