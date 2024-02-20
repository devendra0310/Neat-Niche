import React, { useState } from 'react'
import banner from '../images/contactus.jpg'
import { IoLocationSharp } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaLockOpen } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";



const ContactUs = () => {

  const [user,setUser]=useState({
    name:"",
    email:"",
    number:"",
    message:""
  });

  function updateUser(event){
    setUser({...user,[event.target.name]:event.target.value});
    console.log(user);
  }

  return (
    <div>

      {/* banner  */}
      <div className='flex flex-col border-b border-grey pb-20'>

      <div className=' bg-lightgrey flex mt-10'>
        <img src={banner} alt='contactus' className=' w-1/2 ' ></img>
        <div className='flex  justify-center items-center  w-1/2'>
          <div className=' w-2/3 flex flex-col gap-5'>
          <span className=' text-darkgrey text-[12px]'>QUESTIONS?</span>
          <p className=' font-medium text-[30px]'>We are here to help with sizing , styling and anything else</p>
          <p className=' font-light text-[14px]'>3 Year Warranty, Extended 90 days Returns, Expedited Shipping</p>
          </div>
        </div>
      </div>

      <div className='flex w-[1200px] mx-auto mt-20 gap-8'>

      <div className='flex w-1/4 gap-3'>
        <IoLocationSharp className='text-[30px] text-darkgrey' />
        <div className='flex flex-col gap-1'>
          <span className=' font-medium'>Address</span>
          <p className=' text-darkgrey font-light'>Hanuwant Nagar, Gokulpura, Jaipur, Rajasthan, 302012, India</p>
        </div>
      </div>
      <div className='flex w-1/4 gap-3'>
        <IoCall className='text-[20px] text-darkgrey' />
        <div className='flex flex-col gap-1'>
          <span className=' font-medium'>Call Us</span>
          <p className=' text-darkgrey font-light'>(+91) 8769028559</p>
          <p className=' text-darkgrey font-light'>(+91) 9558209678</p>
        </div>
      </div>
      <div className='flex w-1/4 gap-3'>
        <FaLockOpen className='text-[20px] text-darkgrey'  />
        <div className='flex flex-col gap-1'>
          <span className=' font-medium'>Open</span>
          <p className=' text-darkgrey font-light'>Monday-Friday: 8am-4pm</p>
          <p className=' text-darkgrey font-light'>Saturday-Sunday: 9am-5pm</p>
        </div>
      </div>
      <div className='flex w-1/4 gap-3'>
        <MdEmail className='text-[20px] text-darkgrey' />
        <div className='flex flex-col gap-1'>
          <span className=' font-medium'>Email</span>
          <p className=' text-darkgrey font-light'>devendrashekhawat561@gmail.com</p>
          <p className=' text-darkgrey font-light'>shunuske561@gmail.com</p>
        </div>
      </div>

      </div>

      </div>

      {/* form */}
      <div className='mt-20 flex flex-col items-center mx-auto mb-20 gap-5 w-1/2 '>
        <p className=' text-[40px]'>  Got Any Questions?</p>
        <p className=' text-darkgrey font-light'>Use the form below to get in touch with the Sales team</p>
        <form className='flex flex-col font-light gap-4 w-full'>
          <div className='flex gap-2 w-full'>
            <input className='border border-grey p-2 w-1/2 focus:border-black' type='text' name='name' placeholder='Name' onChange={updateUser} ></input>
            <input className='border border-grey p-2 w-1/2' type='email' name='email' placeholder='Email *' onChange={updateUser} ></input>
          </div>
          <input className='border border-grey p-2' type='tel' name='number' placeholder='Phone Number' onChange={updateUser} ></input>
          <textarea className='border border-grey p-2' name='message' placeholder='Message' rows={4} cols={50} onChange={updateUser} ></textarea>
          <button className='flex mx-auto items-center text-white bg-black rounded-full p-3 pl-6 pr-6 gap-1 w-max hover:bg-red duration-200'>
            <span>Send</span>
            <FaChevronRight/>
          </button>
        </form>
      </div>

    </div>
  )
}

export default ContactUs