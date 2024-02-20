import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import {updateDetails,updatePassword} from '../redux/slices/userSlice'
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const dispatch=useDispatch();
  const {user} =useAuth();
  const [data,setData]=useState({
    name:user.name,
    email:user.email
  })
  const [pass,setPass]=useState({
    oldPassword:"",
    newPassword:"",
    confirmPassword:""
  })
  function perDetails(event){
    setData({...data,[event.target.name]: event.target.value})
  }
  function PerHandler(){
    dispatch(updateDetails(data));
  }
  function PassHandler(){
    dispatch(updatePassword(pass));
  }
  function passDetails(event){
    setPass({...pass,[event.target.name]: event.target.value})
  }
  return (
    <div className='flex flex-col items-center mt-16 mb-16 border font-light'>
        <div className='text-[40px]'>Your Personal Information</div>
        <div className='flex flex-col gap-4 mt-8  w-1/3 items-center'>
          <div className='flex gap-6 justify-end w-full'>
            <div>Name</div>
            <input className='bg-lightgrey w-2/3 p-1 text-darkgrey outline-none' type='text' value={data.name} onChange={perDetails} name='name'></input>
          </div>
          <div className='flex gap-6 justify-end w-full'>
            <div>Email</div>
            <input className='bg-lightgrey w-2/3 p-1 text-darkgrey outline-none' type='email' value={data.email} onChange={perDetails} name='email'></input>
          </div>
          <div className='flex gap-6 justify-end w-full'>
            <div>Password</div>
            <input className='bg-lightgrey w-2/3 p-1 text-darkgrey outline-none' type='password' value={pass.oldPassword} onChange={passDetails} name='oldPassword'></input>
          </div>
          <div className='flex gap-6 justify-end w-full'>
            <div>New Password</div>
            <input className='bg-lightgrey w-2/3 p-1 text-darkgrey outline-none' type='password' value={pass.newPassword} onChange={passDetails} name='newPassword'></input>
          </div>
          <div className='flex gap-6 justify-end w-full'>
            <div>Confirm Password</div>
            <input className='bg-lightgrey w-2/3 p-1 text-darkgrey outline-none' type='password' value={pass.confirmPassword} onChange={passDetails} name='confirmPassword'></input>
          </div>
          <div className='flex gap-3 mt-8'>
          <button onClick={PassHandler}  className='border text-white bg-black  pl-4 pr-4 p-1  hover:bg-red delay-100'>Change Password</button>
          <button onClick={PerHandler} className='border text-white bg-black  pl-4 pr-4 p-1  hover:bg-red delay-100'>Save</button>
          </div>
        </div>
    </div>
  )
}

export default Profile