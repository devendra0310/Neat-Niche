import React, { useEffect } from 'react'
import { TfiHeadphone } from "react-icons/tfi";
import { IoRocketOutline } from "react-icons/io5";
import { TbMoneybag } from "react-icons/tb";
// import { FaLessThan } from "react-icons/fa6";
// import { FaGreaterThan } from "react-icons/fa6";
import Product from '../components/Product';
import {useDispatch, useSelector} from "react-redux"
import { fetchProduct } from '../redux/slices/productSlice';
import Loader from '../components/Loader';

const Home = () => {

  const dispatch=useDispatch();
  const {products,loading}=useSelector(state => state.product);
  useEffect(()=>{
    dispatch(fetchProduct());
  },[]);

  return (
    <>
      {
        loading  ? (<Loader/>) : (

          <div className='w-[100vw]'>

      <div className='home-banner w-full h-[700px] mt-2'></div>

      <div className='flex mt-32 justify-around mb-28 ml-24 mr-24'>
        <div className='flex flex-col items-center gap-1 border-r-2 border-dashed border-grey pr-32'>
          <IoRocketOutline className="text-[70px] text-grey" />
          <p className='font-bold'>FREE SHIPPING & RETURN</p>
          <p className='text-grey'>Free Shipping on all India Orders</p>
        </div>

        <div className='flex flex-col items-center border-r-2 border-dashed border-grey pr-32'>
          <TbMoneybag className="text-[70px] text-grey"/>
          <p className='font-bold'>MONEY GUARANTEE</p>
          <p className='text-grey'>30 days money back guarantee</p>
        </div>

        <div className='flex flex-col items-center'>
          <TfiHeadphone className="text-[70px] text-grey"/>
          <p className='font-bold'>ONLINE SUPPORT</p>
          <p className='text-grey'>We support 24*7 a day</p>
        </div>

      </div>

      <div className='w-full'>
        <div className='flex flex-col  items-center mb-16'>
        <h1 className='text-[50px]'>Featured Products</h1>
        <div className='w-[60px] h-[5px] bg-[#000000]'></div>
        </div>

        <div className='flex justify-center'>
        {/* <div className='small'><FaLessThan/> </div> */}
        <div className='flex flex-wrap justify-center'>
          {
            products && products.map((product,index)=>{
              return <Product product={product} key={index} />
            })
          }
        </div>
        {/* <div className='small'><FaGreaterThan/> </div> */}
        </div>
      </div>

    </div>

        )
      }
    </>
  )
}

export default Home