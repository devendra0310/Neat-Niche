const mongoose=require('mongoose');
const validator=require('validator');
const bcryptjs=require('bcryptjs');

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter user Name"],
        minLength:[4,"Name should have more than 4 characters"],
        maxLength:[30,"Name should not have more than"]
    },
    email:{
        type:String,
        required:[true,"Please enter user Email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter the password"],
        minLength:[8,"Password should be greater than 8 characters"]
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resPasswordExpire:Date
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password=await bcryptjs.hash(this.password,10);
})

module.exports=mongoose.model("User",userSchema);