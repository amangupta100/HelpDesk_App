const mongoose = require("mongoose")

const monConn = async () =>{
    try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB connected successfully");
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports = monConn