import { SERVER_URL } from "./constants/server";
import { handleHttpRes } from "./utils/handleHttpRes";

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
