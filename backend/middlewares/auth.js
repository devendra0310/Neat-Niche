const jwt=require("jsonwebtoken");
require('dotenv').config();
const User=require('../models/userModel');

exports.isAuthenticated = async (req,res,next) => {
    try{
        const reqtoken = req.header("Authorization");
        if(!reqtoken){
            return res.status(500).json({
                success:false,
                message:"You are not allowed to access this resource"
            })
        }

        const token = reqtoken.replace("Bearer", "").trim();
        const decodedToken = await jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decodedToken.id);
        next();

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error in authenticating user"
        })
    }
}


exports.isAdmin= async (req,res,next) => {
    try{
        if(req.user.role!=="admin"){
            return res.status(403).json({
                success:false,
                message:`${req.user.role} is not allowed to access this resource`
            })
        } 
        next();

    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error in authenticating ADMIN"
        })
    }
}