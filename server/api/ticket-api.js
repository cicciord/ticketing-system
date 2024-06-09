const { getTickets } = require("../dao/ticket-dao");

exports.getTickets = async function (_, res) {
  try {
    const tickets = await getTickets();
    res.json(tickets);
  } catch (error) {
    res.status(500).json(error);
  }
};

