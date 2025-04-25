const AgentModel = require("../../models/AgentModel")
const UserModel = require("../../models/UserModel")
const bcrypt = require("bcrypt")

const createAgent =async (req,res) =>{
    let {name,email,password} = req.body
try{
  
  let user = await AgentModel.findOne({email})
  let user2 = await UserModel.findOne({email})
  if(user || user2){
     return res.json({message:"Agent Already Exist or Entered email belongs to customer account",success:false})
  }
  
  else{
  bcrypt.genSalt(10,function(err,salt){
      bcrypt.hash(password,salt,async function(err,hash){
          user = await AgentModel.create({name:name,email:email,password:hash})
          res.json({message:"Agent created successfully",success:true,user:{name:user.name,id:user._id}})
      })
  })
  }
  
  }catch(err){
     res.status(500).json({message:"Internal Server Error",success:false})
  }
}


const getAllAgents = async (req,res) =>{
    try{
        const agents = await AgentModel.find({}).sort({ createdAt: -1 });
        res.json({agents,success:true})
    }catch(err){
        res.status(500).json({message:"Internal Server Error",success:false})
    }
}

module.exports = {createAgent,getAllAgents}