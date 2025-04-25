const TicketModel = require("../../models/TicketModel")

const allTickets = async (req, res) => {
  try {
    const tickets = await TicketModel.find()
      .populate('customer', 'name email') // adjust 'customerId' and fields as needed
      .sort({ updatedAt: -1 }); // Most recent first

    res.json(tickets);
  } catch (err) {
    res.json({ message: 'Error fetching tickets' });
  }
};


const updateTicketStatus = async (req, res) => {
  const { ticketId } = req.params;
  const { status } = req.body;

  if (!['Active', 'Pending', 'Closed'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const updatedTicket = await TicketModel.findByIdAndUpdate(
      ticketId,
      {
        status,
        lastUpdated: new Date(),
      },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json({ message: "Status updated", ticket: updatedTicket });
  } catch (error) {
    console.error("Error updating ticket status:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {allTickets,updateTicketStatus}