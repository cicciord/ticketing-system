const ticketDao = require("../dao/ticket-dao");

const { validationResult } = require("express-validator");

const errorFormatter = ({ location, msg, param }) => {
  return `${location}[${param}]: ${msg}`;
};

exports.getTickets = async function (req, res) {
  try {
    const tickets = await ticketDao.getTickets();
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
    const additionalContents = await ticketDao.getAdditionalContents(id);
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
    const ticketId = await ticketDao.createTicket({ ...ticket, owner_id });
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
    state = await ticketDao.getTicketState(req.params.id);
  } catch (error) {
    return res.status(500).json(error);
  }

  if (state === "closed") {
    res.status(400).json({ error: "Ticket is closed" });
    return
  }

  try {
    const ticketId = req.params.id;
    const additionalContent = req.body;
    const authorId = req.user.id;
    const id = await ticketDao.createAdditionalContent({
      ...additionalContent,
      ticket_id: ticketId,
      author_id: authorId,
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
    await ticketDao.openTicket(id);
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
      ownerId = await ticketDao.getTicketOwnerId(id);
    } catch (error) {
      res.status(500).json(error);
    }

    if (req.user.admin || req.user.id === ownerId) {
      await ticketDao.closeTicket(id);
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
    const id = await ticketDao.updateCategory({
      category,
      ticketId,
    });
    res.json({ id });
  } catch (error) {
    res.status(500).json(error);
  }
};
