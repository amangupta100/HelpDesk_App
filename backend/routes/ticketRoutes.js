const {getAllTickets} = require("../controllers/ticketController");
const router = require("express").Router();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const TicketModel = require("../models/TicketModel");

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

router.post("/create-ticket", upload.single("attachment"), async (req, res) => {
    const { title, description,userId } = req.body;
   
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

        const newTicket = new TicketModel({
            title,
            description,
            attachment: attachmentUrl,
            customer: userId,
        });

        await newTicket.save();

        return res.json({ success: true, message: "Ticket created successfully", ticket: newTicket });
    } catch (error) {
        console.error("Ticket creation failed:", error);
        return res.json({ success: false, message: "Internal server error", error: error.message });
    }
});

router.get("/allTickets",getAllTickets)

module.exports = router;