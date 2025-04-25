const jwt = require("jsonwebtoken")

const CreateToken = (id,role) =>{
return jwt.sign({id,role},process.env.JWT_secret,{
    expiresIn:"3d"
})
}

module.exports = CreateToken