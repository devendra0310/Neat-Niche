const Product=require('../models/productModel');

// Creating a Product --Admin
exports.createProduct = async(req,res,next) =>{
    req.body.user=req.user.id;
    const product=await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
}

// Getting all the Products 
exports.getAllProducts = async(req,res) => {
    try{
        const {name,category,type,sort}=req.query;

    const queryObject={};
    if(category){
        queryObject.category=category;
    }
    if(type){
        queryObject.type=type;
    }
    if(name){
        queryObject.name={ $regex:name , $options:'i' }
    }
    let apiData= Product.find(queryObject);

    if(sort){
        let s=sort;
        let sortFix=s.replace(","," ");
        apiData=apiData.sort(sortFix);
    }
    
    let pageSize=Number(req.query.page) || 1;
    let limitLength=Number(req.query.limit) ;
    let skipP= (pageSize-1) * limitLength;
    apiData=apiData.skip(skipP).limit(limitLength);
    
    let products=await apiData;
    products=await Product.find(queryObject).sort("price");

    return res.status(200).json({
        size:products.length,
        products
    })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in fetching all products"
        })
    }

}

// Getting a single product 
exports.getProduct = async(req,res) => {
    try{
        const id=req.params.id;
        let result=await Product.findById(id);
        
        if(!result){
            return res.status(500).json({
            success:false,
            message:"No Product Found"
            })
        }
       
        res.status(200).json({
            success:true,
            message:"Product fetched successfully",
            product : [result]
        })

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Error in fetching Product"
        })
        console.log(error);
    }
}

// Update a Product --Admin 
exports.updateProduct = async(req,res,next) => {
    try{
        const id=req.params.id;
        let product=await Product.findById(id);
        if(!product){
            return res.status(500).json({
            success:false,
            message:"No Product Found"
            })
        }
        product = await Product.findByIdAndUpdate({_id:id},req.body,{new:true});
        res.status(200).json({
            success:true,
            message:"Product updated successfully",
            product
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Error in updating Product"
        })
        console.log(error);
    }
}

// Delete A Product --Admin 
exports.deleteProduct = async(req,res,next) => {
    try{
        const id=req.params.id;
        let product=await Product.findById(id);
        if(!product){
            return res.status(500).json({
            success:false,
            message:"No Product Found"
            })
        }
        await Product.deleteOne({_id:id});
        res.status(200).json({
            success:true,
            message:"Product Deleted successfully",
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Error in Deleting Product"
        })
        console.log(error);
    }
}

// creating product review 
exports.createProductReview = async(req,res,next) => {
    try{
        const {rating,comment,productId}=req.body;
        const review={
            user:req.user._id,
            name:req.user.name,
            rating:Number(rating),
            comment
        }
        const product=await Product.findById(productId);
        const isReviewed=product.reviews.find(
            (rev)=> rev.user.toString()===req.user._id.toString()
            );
        
        if(isReviewed){
            product.reviews.forEach((rev)=>{
                if(rev.user.toString()===req.user._id.toString()){
                    rev.comment=comment,
                    rev.rating=rating
                }
            })
        }
        else{
            product.reviews.push(review);
            product.numofReviews=product.reviews.length;
        }
        //  
        console.log(product.ratings);

        await product.save({validateBeforeSave:false});
        res.status(200).json({
            success:true
        })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error in creating review"
        })
    }
}

// getting all reviews 
exports.getProductReviews = async(req,res,next) => {
    try{
        const product=await Product.findById(req.query.id);
        if(!product){
            return res.status(400).json({
                success:false,
                message:"No such Product exists"
            })
        }
        res.status(200).json({
            success:true,
            reviews:product.reviews
        })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error in fetching all reviews"
        })
    }
}

// Deleting a review 
exports.deleteReview = async(req,res,next) => {
    try{
        const product=await Product.findById(req.query.id);
        if(!product){
            return res.status(400).json({
                success:false,
                message:"No such Product exists"
            })
        }
        const review=product.reviews.filter(
            (rev)=> { rev._id.toString()!==req.query.id.toString()
        })

        // do this for ratings also 
        await Product.findByIdAndUpdate(req.query.id,{reviews:review},{new:true,runValidators:true,useFindAndModify:false})

        res.status(200).json({
            success:true,
            reviews:product.reviews
        })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error in deleting a review"
        })
    }
}