const TicketModel = require("../models/TicketModel");

const getAllTickets = async (req, res) => {
  const { userId } = req.query;
  try {
    const filter = userId ? { customer: userId } : {};
    const tickets = await TicketModel.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, tickets });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching tickets", error: error.message });
  }
};

module.exports = { getAllTickets };
