import { handleHttpRes } from "./utils/handleHttpRes";
import { SERVER_URL } from "./constants/server";

export const createAdditionalContent = async (ticketId, data) => {
  return handleHttpRes(
    fetch(`${SERVER_URL}/tickets/${ticketId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    }),
  );
};