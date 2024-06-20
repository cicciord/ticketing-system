import { SERVER_URL } from "./constants/server";
import { handleHttpRes } from "./utils/handleHttpRes";

export const getAdditionalContents = async (id) => {
  return handleHttpRes(
    fetch(`${SERVER_URL}/tickets/${id}/contents`, {
      method: "GET",
      credentials: "include",
    }),
  );
};
