import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component';
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { fetchSingleProduct } from '../redux/slices/productSlice';

const Product = ({product}) => {
    const [like,setLike]=useState(0);
    const options={
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        size:window.innerWidth<600?20:20,
        value:product.rating,
        isHalf:true
    }

  return (
   <Link to={`/product/${product._id}`} className='product relative group' >
    <img src={product.images[0].url} alt={product.name} ></img>
    <p>{product.name}</p>
    <div className='flex gap-2 items-center'>
        <ReactStars {...options} />
    </div>
    <span>₹{product.price}</span>
    <div className='absolute top-2 right-3 w-7 h-7 bg-[#ffffff] flex justify-center items-center invisible rounded-full group-hover:ease-linear  group-hover:visible' >
        <button onClick={()=>setLike(!like)}>
        {
            like ? (<FcLike/>) : (<FcLikePlaceholder/>)
        }
        </button>
    </div>
   </Link>
  )
}

export default Product