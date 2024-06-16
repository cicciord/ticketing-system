import { closeTicket } from "./closeTicket";
import { createAdditionalContent } from "./createAdditionalContent";
import { createTicket } from "./createTicket";
import { getAdditionalContents } from "./getAdditionalContents";
import { getEstimation } from "./getEstimation";
import { getJWT } from "./getJWT";
import { getTickets } from "./getTickets";
import { getUser } from "./getUser";
import { login } from "./login";
import { logout } from "./logout";
import { openTicket } from "./openTicket";
import { updateCategory } from "./updateCategory";

export default {
  login,
  getUser,
  logout,
  getTickets,
  getAdditionalContents,
  createTicket,
  createAdditionalContent,
  closeTicket,
  openTicket,
  updateCategory,
  getJWT,
  getEstimation,
};
