import { handleHttpRes } from "./utils/handleHttpRes";
import { SERVER_URL } from "./constants/server";

export const logIn = async (username, password) => {
  return handleHttpRes(
    fetch(`${SERVER_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    }),
  );
};
