const {
  getTickets,
  getAdditionalContents,
  createTicket,
  createAdditionalContent,
  openTicket,
  closeTicket,
  updateCategory,
} = require("../dao/ticket-dao");

exports.getTickets = async function (_, res) {
  try {
    const tickets = await getTickets();
    res.json(tickets);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAdditionalContents = async function (req, res) {
  try {
    const { id } = req.params;
    const additionalContents = await getAdditionalContents(id);
    res.json(additionalContents);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createTicket = async function (req, res) {
  try {
    const ticket = req.body;
    const id = await createTicket(ticket);
    res.json({ id });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createAdditionalContent = async function (req, res) {
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
  try {
    const { id } = req.params;
    await openTicket(id);
    res.json({ id });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.closeTicket = async function (req, res) {
  try {
    const { id } = req.params;
    await closeTicket(id);
    res.json({ id });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateCategory = async function (req, res) {
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
