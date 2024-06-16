import { SERVER_URL } from "./constants/server";
import { handleHttpRes } from "./utils/handleHttpRes";

export const getTickets = async () => {
  return handleHttpRes(
    fetch(`${SERVER_URL}/tickets`, {
      method: "GET",
      credentials: "include",
    }),
  );
};
