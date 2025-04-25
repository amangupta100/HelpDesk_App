const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const app = express();
const cors = require('cors');
const mongConn = require("./config/mongConn")
const ticketRoutes = require('./routes/ticketRoutes')

dotenv.config();
mongConn()

const corsOptions = {
  origin:process.env.frontend_URL,
  credentials: true
};

app.use(cors(corsOptions))
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use("/api/ticket",ticketRoutes)
app.use("/api/admin/ticket",require("./routes/admin/ticketRoutes"))
app.use("/api/admin",require("./routes/admin/agentRoute"))
app.use("/api/agent",require("./routes/agentRoute"))
app.get("/",(req,res)=>{
    res.send("API is running")
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
}
)
