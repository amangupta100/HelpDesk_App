const { allTickets, updateTicketStatus } = require("../../controllers/admin/ticketController");
const TicketModel = require("../../models/TicketModel");
const router = require("express").Router();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
    },
});

cloudinary.config({
    cloud_name:"dbxkt0h5s",
    api_key:295866792124655,
    api_secret:"Bi7etzzMCxWXqb0ZMDE_z4-Z-0U",
})

router.get("/allTickets",allTickets)
router.put("/updateStatus/:ticketId", updateTicketStatus)
router.get("/detailTicket/:ticketId", async (req, res) => {
  const { ticketId } = req.params;
  try {
    const ticket = await TicketModel.findById(ticketId)
      .populate("customer", "name email") // adjust 'customerId' and fields as needed
      .sort({ updatedAt: -1 }); // Most recent first
      res.json(ticket);
      console.log(ticket)
  } catch (err) {
    res.json({ message: "Error fetching ticket" });
  }
})

router.post("/addNote", upload.single("attachment"), async (req, res) => {
    const { title, description, ticketId,role } = req.body;

    try {
        let attachmentUrl = null;

        if (req.file) {
            const uploadResult = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { resource_type: "auto" },
                   async (error, result) => {
                        if (error) {
                            return res.json({ success: false, message: "File upload failed", error: error.message });
                        }
                        else resolve(result);
                    }
                );
                stream.end(req.file.buffer);
            });

            attachmentUrl = uploadResult.secure_url;
        }

        // Update ticket with new note
        const updatedTicket = await TicketModel.findByIdAndUpdate(
            ticketId,
            {
                $push: {
                    notes: {
                        title,
                        description,
                        attachment: attachmentUrl,
                        createdAt: new Date(),
                        authorRole:role
                    }
                }
            },
            { new: true }
        );

        if (!updatedTicket) {
            return res.status(404).json({ success: false, message: "Ticket not found" });
        }

        return res.json({ success: true, message: "Note added successfully", ticket: updatedTicket });
    } catch (error) {
        console.error("Error adding note:", error);
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
});


module.exports = router;