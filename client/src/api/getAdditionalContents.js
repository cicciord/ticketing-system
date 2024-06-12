import { handleHttpRes } from "./utils/handleHttpRes";
import { SERVER_URL } from "./constants/server";

export const getAdditionalContents = async (id) => {
  return handleHttpRes(
    fetch(`${SERVER_URL}/tickets/${id}`, {
      method: "GET",
      credentials: "include",
    }),
  )
}
