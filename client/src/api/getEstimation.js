import { handleHttpRes } from "./utils/handleHttpRes";
import { SERVER2_URL } from "./constants/server";

export const getEstimation = async (token, title, category) => {
  return handleHttpRes(
    fetch(`${SERVER2_URL}/estimation?title=${title}&category=${category}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  );
};