import { handleHttpRes } from "./utils/handleHttpRes";
import { SERVER_URL } from "./constants/server";

export const updateCategory = async (ticketId, categoryData) => {
  return handleHttpRes(
    fetch(`${SERVER_URL}/tickets/${ticketId}/category`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
      credentials: "include",
    }),
  );
};
