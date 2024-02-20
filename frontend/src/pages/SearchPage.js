import React, {useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { useDispatch,useSelector } from 'react-redux';
import { fetchProductCat } from '../redux/slices/productSlice';
import Product from '../components/Product';
import Loader from '../components/Loader'
import Empty from '../components/Empty';

const SearchPage = () => {

    const dispatch=useDispatch();
  
  const {products,loading}=useSelector(state => state.product);

    const [keyword,setKeyword]=useState("");
    function searchSubmitHandler(e){
        e.preventDefault();
        dispatch(fetchProductCat(keyword));
    }


  return (
    <div className='w-screen flex flex-col items-center'>
        <div className='w-[1200px] mx-auto flex flex-col items-center'>
        <h1 className='text-[40px] font-light mb-8 mt-8'>Search</h1>
        <form onSubmit={searchSubmitHandler} className='flex text-[20px]  mb-8 items-center w-full justify-center'>
            <input type='text' placeholder='Search' onChange={(e)=>{ setKeyword(e.target.value) }} className=' border border-grey p-2 w-1/2 '></input>
            <IoSearch onClick={searchSubmitHandler} className='relative left-[-40px] cursor-pointer ' />
        </form>
        </div>
        <div className=' w-[1200px] flex flex-col gap-2 '>
            <div></div>
            <div className='flex flex-wrap gap-2 justify-center mb-10 '>
            {
                loading ? (<Loader/>) : (
                    products.length!==0 ? (
                        products && products.map((product)=>{
                    return <Product product={product} />
                })
                    ) : (<Empty/>)
                )
            }
            </div>
        </div>
    </div>
  )
}

export default SearchPage