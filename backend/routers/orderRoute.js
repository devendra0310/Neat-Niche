const express=require('express');
const router=express.Router();

const {isAuthenticated,isAdmin}=require("../middlewares/auth");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder }=require("../controllers/orderController");

router.post("/order/new",isAuthenticated,newOrder);
router.get("/order/:id",isAuthenticated,isAdmin,getSingleOrder);
router.get("/orders/me",isAuthenticated,myOrders);
router.get("/admin/orders",isAuthenticated,isAdmin,getAllOrders);
router.put("/admin/order/:id",isAuthenticated,isAdmin,updateOrder);
router.delete("/admin/order/:id",isAuthenticated,isAdmin,deleteOrder); 

module.exports=router;