import React, { useEffect,useState } from 'react'
import {useParams} from 'react-router-dom'
import ReactStars from 'react-rating-stars-component';
import { useDispatch,useSelector } from 'react-redux'
import {fetchSingleProduct} from '../redux/slices/productSlice';
import { TfiPackage } from "react-icons/tfi";
import { SlLock } from "react-icons/sl";


const ProductPage = () => {
    const {id}=useParams();
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(fetchSingleProduct(id));
    },[id]);
    const {products}=useSelector(state => state.product); 
    console.log('products', products)
    const product = products[0]
    const [quantity,setQuantity]=useState(0);
    const [hide,setHide]=useState(true);
    const [random,setRandom]=useState(0);
    const options={
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        size:window.innerWidth<600?20:20,
        value:product?.rating,
        isHalf:true
    }



    useEffect(()=>{
        window.scrollTo(0, 0);
        const interval = setInterval(
            // set number every 5s
            () => setRandom(Math.floor(Math.random() * 50 + 1)),
            5000
          ); 
          return () => {
            clearInterval(interval);
          };       
    },[])

  return (
    product && (<div className='w-[1200px] mx-auto flex mt-9 mb-12 gap-16 relative'>

    <div className='w-1/2 max-h-screen '>
        {
            product && product.images && <img src={product.images[0].url} alt={'mainimage'} className='w-full h-2/3'></img>
        }
        <div className='flex mt-4 gap-6 mb-6'>
            {
                product && product.images && product.images.map((imag,index)=>{
                    return (<img src={imag.url} key={index} alt={'boximage'} className='aspect-square w-24 cursor-pointer' ></img>)
                })
            }
        </div>
    </div>

    <div className='flex flex-col gap-4 w-1/2'>
    {/* 1st Part */}
        <div className='border-b-lightgrey pb-10 border-b-2 flex flex-col gap-3 font-light'>
        <h1 className='text-[40px] '>{product.name}</h1>
        <span className='text-[25px]'>₹ {product.price}</span>
        <div className='flex gap-1 items-center'>
        <ReactStars {...options}/>
        <div>({product.numofReviews})</div>
        </div>
        <div className='flex flex-grow justify-start gap-5 '>
        <button className='flex border-2 w-[20%] rounded-full border-lightgrey justify-between items-center text-[16px]'>
            <span className='cursor-pointer p-2 pl-4 ' onClick={()=>{ if(quantity!==0) setQuantity(quantity-1) }} >-</span>
            <span className=''>{quantity}</span>
            <span className='cursor-pointer p-2 pr-4' onClick={()=>{setQuantity(quantity+1)}}>+</span>
        </button>
        <button className='border p-2 rounded-full text-[16px] pl-8 pr-8 bg-black text-white'>Add to Cart</button>
        <button className='border p-2 rounded-full text-[16px] pl-8 pr-8 text-white bg-red'>Buy it Now</button>
        </div>
        <div className='mt-2'>Description: {product.description}</div>
        </div>

        {/* 2nd Part  */}
        <div className='font-light'>
            <p>Type: {product.category}</p>
            <p>Sku: {product._id}</p>
        </div>

        {/* 3rd part  */}
        <div className='flex flex-col gap-2 font-light'>
            <div className='border-b-lightgrey pb-2 border-b-2 flex justify-between'>
                <p>Shipping Information</p>
                {
                    hide ? (<span onClick={()=>{setHide(!hide)}} className='cursor-pointer'>+</span>) : 
                    (<span onClick={()=>{setHide(!hide)}} className='cursor-pointer'>-</span>)
                }
            </div>
            {
                hide ? (<div/>) : (
                    <div>
                <p>- Ships within 1-2 business days.</p>
                <p>- Ships in our fully recyclable and biodegradable signature boxes.</p>
            </div>)
            }
        </div>

        {/* 4th part  */}
       <div className='flex flex-col gap-6 border-b-lightgrey pb-10 border-b-2'>
       <div className='mt-2  flex flex-col font-light'>
        <div className='flex gap-2 items-center'>
           <SlLock/>
            <div>Secure Payment</div>
        </div>
        <div className='flex gap-2 items-center'>
            <TfiPackage/>
            <div>2 Year Warranty</div>
        </div>
       </div>
       <div className='font-light'>
            <p>👀 <span className='text-red font-normal'>{random}</span> customers are viewing this product</p>
            <p>🔥 30 sold in last 18 hours</p>
        </div>
        <div className='font-light flex items-center gap-3'>
            <TfiPackage/>
            <p>Spend 1,000.00 for Free Shipping</p>
        </div>
       </div>

       {/* 5th Part - Reviews  */}
       <div className='font-light'>
        <h1 className='text-[30px]'>Customer Reviews</h1>
        <div className='flex gap-2 items-center justify-between border-b-2 border-b-lightgrey pb-8'>
        <div className='flex items-center gap-4'>
        <ReactStars {...options}/>
        <p>Based on {product.numofReviews} reviews</p>
        </div>
        <div className='border p-2 rounded-full text-[16px] pl-8 pr-8 text-white bg-red'>
            <button>Write a Review</button>
        </div>
        </div>
       </div>
    </div>

    </div>)
  )
}

export default ProductPage