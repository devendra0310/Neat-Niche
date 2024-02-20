const mongoose=require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        lowercase:true,
        required:[true,"Please enter Product Name"]
    },
    description:{
        type:String,
        required:[true,"Please enter Product Description"]
    },
    price:{
        type:Number,
        required:[true,"Please enter Product Price"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        trim:true,
        lowercase:true,
        required:[true,"Please enter Product Category"]
    },
    type:{
        type:String,
        trim:true,
        lowercase:true,
        required:[true,"Please enter Product Category"]
    },
    stock:{
        type:Number,
        required:true,
        maxLength:[4,"Please enter Product Stock"],
        default:1
    },
    numofReviews:{
        type:Number,
        default:1
    },
    reviews:[
        {
            user:{
                type:mongoose.Types.ObjectId,
                ref:'User',
                required:true
            },
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true,
                default:1
            },
            comment:{
                type:String,
                required:true,
            }
        }
    ],
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model("Product",productSchema);