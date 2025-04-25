const { createAgent, getAllAgents } = require("../../controllers/admin/agentController");
const router = require("express").Router();

router.post("/create-agent",createAgent)
router.get("/all-agents",getAllAgents);

module.exports = router