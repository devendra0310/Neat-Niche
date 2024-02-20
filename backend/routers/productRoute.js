const express=require('express');
const router=express.Router();

const {getAllProducts,getProduct,createProduct,updateProduct,deleteProduct,
     createProductReview, getProductReviews, deleteReview}=require('../controllers/productController');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');

router.get('/products',getAllProducts);
router.post('/admin/product/new',isAuthenticated,isAdmin,createProduct);
router.put('/admin/product/:id',isAuthenticated,isAdmin,updateProduct);
router.delete('/admin/product/:id',isAuthenticated,isAdmin,deleteProduct);
router.get('/product/:id',getProduct);

router.put("/review",isAuthenticated,createProductReview);
router.get("/reviews",getProductReviews);
router.delete("/reviews",isAuthenticated,deleteReview);

module.exports=router;