import React from 'react'
import { useNavigate } from 'react-router-dom'

const Empty = () => {
    const navigate=useNavigate();
  return (
    <div className='flex flex-col justify-center items-center'>
        <div>No Products</div>
        <button onClick={()=>navigate('/')} className='border text-white bg-black p-3 rounded-full hover:bg-red delay-100'>Click to go to Home Page</button>
    </div>
  )
}

export default Empty