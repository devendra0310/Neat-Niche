const express=require('express');
const router=express.Router();

const {registerUser,login, logout, ResetPassword, getUserDetails, updatePassword, updateProfile,
     getAllUsers, getSingleUser, updateUserRole, deleteUser}=require('../controllers/userController');
const {isAuthenticated, isAdmin}=require("..//middlewares/auth");

router.post("/register",registerUser);
router.post("/login",login);
router.get("/logout",logout);
router.post("/password/forgot",ResetPassword); 

router.get("/me",isAuthenticated,getUserDetails);
router.put("/password/update",isAuthenticated,updatePassword);
router.put("/me/update",isAuthenticated,updateProfile);

router.get("/admin/users",isAuthenticated,isAdmin,getAllUsers);
router.get("/admin/user/:id",isAuthenticated,isAdmin,getSingleUser);
router.put("/admin/user/:id",isAuthenticated,isAdmin,updateUserRole);
router.delete ("/admin/user/:id",isAuthenticated,isAdmin,deleteUser);

module.exports=router;