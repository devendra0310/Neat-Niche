const Order=require("../models/orderModel");
const Product = require("../models/productModel");

// creating a new order 
exports.newOrder = async (req,res,next) => {
    try{
        const {
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        }=req.body;
    
        const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            user:req.user._id,
            paidAt:Date.now()
        });
    
        res.status(201).json({
            success:true,
            message:"Order created successfully",
            order
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error in creating order"
        })
    }
}

// get single order --Admin
exports.getSingleOrder = async (req,res,next) => {
    try{
        const order=await Order.findById(req.params.id).populate("user","name email");
        if(!order){
            return res.status(404).json({
                success:false,
                message:"No order found"
            })
        }
        res.status(200).json({
            success:true,
            order,
            message:"Order data fetched successfully"
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message: "error in fetching single order details"
        })
    }
}

// get logged in user orders 
exports.myOrders = async (req,res,next) => {
    try{
        const orders=await Order.find({user:req.user._id});
        res.status(200).json({
            success:true,
            orders
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message: "error in fetching user order details"
        })
    }
}

// get All Orders --Admin 
exports.getAllOrders = async (req,res,next) => {
    try{
        const orders=await Order.find();
        let totalAmount=0;
        orders.forEach((order)=>{
            totalAmount+=order.totalPrice;
        })
        res.status(200).json({
            success:true,
            totalAmount,
            orders,
            message:"Order data fetched successfully"
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message: "error in fetching all order details for admin"
        })
    }
}

// update order --Admin 
exports.updateOrder = async (req,res,next) => {
    try{
        const order=await Order.findById(req.params.id);
        if(order.orderStatus==="Delivered"){
            return res.status(400).json({
                success:false,
                message:"You have already delivered your order"
            })
        }
        order.orderItems.forEach(async (o)=>{
            await updateStock(o.product,o.quantity);
        })
        order.orderStatus=req.body.status; 
        if(req.body.status==="Delivered")
        order.deliveredAt=Date.now();
        res.status(200).json({
            success:true,
            message:"Order updated successfully"
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message: "error in fetching all order details for admin"
        })
    }
}

async function updateStock(id,quantity){
    const product=await Product.findById(id);
    product.stock-=quantity;
    await product.save();
}

// Delete a order --Admin 
exports.deleteOrder = async (req,res,next) => {
    try{
        const order=await Order.findById(req.params.id);
        if(!order){
            return res.status(400).json({
                success:false,
                message:"No such order Found"
            })
        }
        await order.deleteOne();
        res.status(200).json({
            success:true,
            message:"Order deleted successfully"
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message: "error in deleting  order for admin"
        })
    }
}