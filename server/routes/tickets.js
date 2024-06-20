const express = require("express");
const router = express.Router();
const { param, checkSchema } = require("express-validator");

const ticketApi = require("../api/ticket-api");
const { ticketSchema, additionalContentSchema } = require("../validator");
const { isLoggedIn, isLoggedInAdmin } = require("../middleware/auth");

router.get("/", ticketApi.getTickets);

router.get(
  "/:id/contents",
  [param("id").isInt({ min: 1 })],
  isLoggedIn,
  ticketApi.getAdditionalContents,
);

router.post(
  "/",
  [checkSchema(ticketSchema, ["body"])],
  isLoggedIn,
  ticketApi.createTicket,
);
router.post(
  "/:id/contents",
  [
    param("id").isInt({ min: 1 }),
    checkSchema(additionalContentSchema, ["body"]),
    isLoggedIn,
  ],
  ticketApi.createAdditionalContent,
);

router.patch(
  "/:id/open",
  [param("id").isInt({ min: 0 })],
  isLoggedInAdmin,
  ticketApi.openTicket,
);

router.patch(
  "/:id/close",
  [param("id").isInt({ min: 1 })],
  isLoggedIn,
  ticketApi.closeTicket,
);

router.patch(
  "/:id/category",
  [param("id").isInt({ min: 1 })],
  isLoggedInAdmin,
  ticketApi.updateCategory,
);

module.exports = router;
