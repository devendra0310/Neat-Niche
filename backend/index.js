const express=require('express');
const cookieparser=require("cookie-parser");
const cloudinary=require('cloudinary');
// const cors=require('cors');
const app=express();
app.use(express.json());
app.use(cookieparser());
// app.use(cors);

require('dotenv').config();

const fileupload=require('express-fileupload');
app.use(fileupload());

const dbConnect=require('./config/dbConnect');
dbConnect();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET    
})

const productRoute=require('./routers/productRoute');
const userRoute=require('./routers/userRoute');
const orderRoute=require("./routers/orderRoute");
app.use('/api/v2/',productRoute);
app.use('/api/v2/',userRoute);
app.use('/api/v2/',orderRoute);

const PORT=process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`App is listening to ${PORT} port`);
})
