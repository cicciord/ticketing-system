const {
  getTickets,
  getTicketOwnerId,
  getTicketState,
  getAdditionalContents,
  createTicket,
  createAdditionalContent,
  openTicket,
  closeTicket,
  updateCategory,
} = require("../dao/ticket-dao");

const { validationResult } = require("express-validator");

const errorFormatter = ({ location, msg, param }) => {
  return `${location}[${param}]: ${msg}`;
};

exports.getTickets = async function (req, res) {
  try {
    const tickets = await getTickets();
    if (req.isAuthenticated()) {
      res.json(tickets);
    } else {
      tickets.forEach((ticket) => {
        delete ticket.text;
      });
      res.json(tickets);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAdditionalContents = async function (req, res) {
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.errors);
  }

  try {
    const { id } = req.params;
    const additionalContents = await getAdditionalContents(id);
    res.json(additionalContents);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createTicket = async function (req, res) {
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.errors);
  }

  try {
    const ticket = req.body;
    const { id: owner_id } = req.user;
    const ticketId = await createTicket({ ...ticket, owner_id });
    res.json({ ticketId });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createAdditionalContent = async function (req, res) {
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.errors);
  }

  let state;
  try {
    state = await getTicketState(req.params.id);
  } catch (error) {
    res.status(500).json(error);
  }
  console.log(state);

  if (state === "closed") {
    return res.status(400).json({ error: "Ticket is closed" });
  }

  try {
    const ticketId = req.params.id;
    const additionalContent = req.body;
    const id = await createAdditionalContent({
      ...additionalContent,
      ticket_id: ticketId,
    });
    res.json({ id });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.openTicket = async function (req, res) {
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.errors);
  }

  try {
    const { id } = req.params;
    await openTicket(id);
    res.json({ id });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.closeTicket = async function (req, res) {
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.errors);
  }

  try {
    const { id } = req.params;

    let ownerId;
    try {
      ownerId = await getTicketOwnerId(id);
    } catch (error) {
      res.status(500).json(error);
    }

    if (req.user.admin || req.user.id === ownerId) {
      await closeTicket(id);
      res.json({ id });
    } else {
      res.status(401).json({ error: "Not authorized" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateCategory = async function (req, res) {
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.errors);
  }

  try {
    const ticketId = req.params.id;
    const { category } = req.body;
    console.log("API");
    console.log("ticketId", ticketId);
    console.log("category", category);
    const id = await updateCategory({
      category,
      ticketId,
    });
    res.json({ id });
  } catch (error) {
    res.status(500).json(error);
  }
};
