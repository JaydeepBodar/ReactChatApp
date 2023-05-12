const jwt = require("jsonwebtoken");
const User = require("../Model/Users");
const protectroute = async (req, res,next) => {
    try{ 
        const decode=jwt.verify(req.headers.authorization,process.env.SECRET_KEY)
        console.log("decode",decode)
        req.user=await User.findById(decode.id).select('-password')
        next()
    }catch(e){
        res.status(401).json({message:"No authorize user"})
    }
};
module.exports=protectroute;