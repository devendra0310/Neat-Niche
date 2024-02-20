const User=require('../models/userModel');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const bcryptjs=require('bcryptjs');
const crypto=require('crypto');
const sendEmail=require('../utils/sendEmail');
// const { REFUSED } = require('dns');

// Register a User 
exports.registerUser = async(req,res) =>{
    try{
        const {name,email,password}=req.body;
        let user=await User.create({
            name,
            email,
            password,
        })
        let token=await jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE});
        res.status(201).json({
            success:true,
            message:"user registered successfully",
            token,
            user
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Error in registering a user",
            data:error
        })
        console.log(error);
    }
}

// Login 
exports.login= async(req,res) =>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Email or Password missing"
            })
        }
        let user=await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid email or Password"
            })
        }
        if(await bcryptjs.compare(password, user.password)){

        let token=await jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE});
        const options={
            expiresIn: new Date(Date.now()+ 3*24*60*60*1000),
            httpOnly:true
        }
        res.cookie("token",token,options).status(200).json({
            success:true,
            user,
            token
        })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Invalid email or Password"
            });
        }

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error while logging in a user",
            error:error
        })
    }
}

// Logout 
exports.logout = async(req,res) => {
    try{
        res.cookie("token",null,{
            expires:new Date(Date.now()),
            httpOnly:true
        })
        res.status(200).json({
            success:true,
            message:"User logged out successfully"
        })

    }catch(error){
        res.status(200).json({
            success:false,
            message:"Error in logging out user",
        })
    }
}

// Forgot Password 
exports.ResetPassword = async(req,res) => {
    try{
        const user=await User.findOne({email:req.body.email});
        if(!user){
            return res.status(403).json({
                success:false,
                message:"User not Found"
            })
        }
        const resetToken=crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken=crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpire=Date.now()+3*60*1000;
        const resetPasswordUrl=`${req.protocol }://${req.get("host")}/api/v1/password/reset/${resetToken}`;
        const message=`Your password reset token is  \n\n ${resetPasswordUrl} \n\n If you have not requested 
        this email,please ignore it.`;
        
        try{
            await sendEmail({
                email:user.email,
                subject:"Ecommerce Password Recovery",
                message
            })
            res.status(200).json({
                success:true,
                message:`Email sent to ${user.email} successfully`
            })
        }catch(error){
            console.log(error);
        }

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error in reset Password"
        })
    }
}


// get user details 
exports.getUserDetails = async(req,res,next) => {
    try{
        const user=await User.findById(req.user.id);
        if(!user){
            return res.status(401).json({
                succcess:false,
                message:"No such user exists"
            })
        }
        res.status(200).json({
            success:true,
            message:"User details fetched successfully",
            user
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error in getting user details"
        })
    }
}

// Reset Password 
exports.updatePassword = async(req,res,next) => {
    try{
        const user=await User.findById(req.user.id);
        const oldPassword=req.body.oldPassword;
        const newPassword=req.body.newPassword;
        const confirmPassword=req.body.confirmPassword;
        const isMatched=await bcryptjs.compare(oldPassword,req.user.password);
        if(!isMatched){
            return res.status(400).json({
                success:false,
                message:"Old Password is incorrect"
            })
        }
        if(newPassword!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"New Password and Confirm Password do not match"
            })
        }

        user.password=newPassword;
        await user.save(); 

        res.status(200).json({
            success:true,
            message:"Password changed successfully"
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error in resetting password"
        })
    }
}

// update profile 
exports.updateProfile = async(req,res,next) => {
    console.log("21");
    try{
        let newUserData={
            name:req.body.name,
            email:req.body.email
        }
        const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
            new:true
        })
       
        res.status(200).json({
            success:true,
            message:"Password changed successfully",
            user
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error in updating profile"
        })
    }
}

// get all user details (admin)
exports.getAllUsers = async(req,res,next) => {
    try{
        const user=await User.find();
        res.status(200).json({
            success:true,
            size:user.length,
            user
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error in fetching all users"
        })
    }
}

// get a single user (admin) 
exports.getSingleUser = async(req,res,next) => {
    try{
        const user=await User.findById(req.params.id);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"No such user exists"
            })
        }
        res.status(200).json({
            success:true,
            user
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error in fetching user"
        })
    }
}


// update user role --Admin 
exports.updateUserRole = async(req,res,next) => {
    try{
        let newUserData={
            name:req.body.name,
            email:req.body.email,
            role:req.body.role
        }
        const user=await User.findByIdAndUpdate(req.params.id,newUserData,{
            new:true
        })

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User does not exists"
            })
        }
       
        res.status(200).json({
            success:true,
            message:"User role changed successfully",
            user
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error in updating role"
        })
    }
}

// Delete  a User --Admin 
exports.deleteUser = async(req,res,next) => {
    try{
        const user=await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User does not exist"
            })
        }
       
        res.status(200).json({
            success:true,
            message:"User deleted successfully",
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error in deleting user"
        })
    }
}