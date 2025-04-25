const userModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const CreateToken = require('../libs/genToken');
const AgentModel = require('../models/AgentModel');
const UserModel = require('../models/UserModel');

const signUp =async (req,res) =>{
  let {name,email,password} = req.body
  try{
  
  let user = await userModel.findOne({email})
  let user2 = await AgentModel.findOne({email})
  if(user || user2){
     return res.json({message:"User Already Exist, try using Login",success:false})
  }
  
  else{
  bcrypt.genSalt(10,function(err,salt){
      bcrypt.hash(password,salt,async function(err,hash){
          user = await userModel.create({name:name,email:email,password:hash})
          res.json({message:"User created successfully",success:true,token:CreateToken(user._id,user.role),user:{name:user.name,id:user._id}})
      })
  })
  }
  
  }catch(err){
     res.status(500).json({message:"Internal Server Error",success:false})
  }
  
  }

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if agent exists
    const agent = await AgentModel.findOne({ email });

    if (agent) {
      const isMatch = await bcrypt.compare(password, agent.password);

      if (isMatch) {
        return res.json({
          success: true,
          message: 'Agent login successful',
          user:{name:agent.name,id:agent._id,role: 'Agent',}
        });
      }
    }

    // Check if user exists
    const user = await UserModel.findOne({ email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        return res.json({
          success: true,
          message: 'User login successful',
          user:{name:user.name,id:user._id,role: 'Customer',}
        });
      }
    }

    // If neither matched
    return res.json({
      success: false,
      message: 'Invalid email or password',
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { login };

module.exports = {signUp,login}