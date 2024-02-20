import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import {login} from '../redux/slices/userSlice';
import { useAuth } from '../context/AuthContext';
// import {toast} from 'react-toastify'

const Login = () => {
    const [data,setData]=useState({
        email:"",
        password:""
    })

    const {storeTokenLS} = useAuth();
    const navigate=useNavigate();

    async function LoginHandler(e){
        e.preventDefault();
        try{
            const response = await fetch('/api/v2/login',{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if(result.success){
                storeTokenLS(result?.token)
                navigate('/')
            }
        }catch(error){
            console.log(error);
        }
       
    }
    function changeHandler(e){
        setData({...data,[e.target.name]: e.target.value});
    }
  return (
    <div className='w-screen'>
        <div className='flex flex-col mx-auto items-center mt-20 mb-20 gap-4 w-1/3 font-light' >
        <h1 className="text-[40px] font-light">Login</h1>
        <p className='font-light text-darkgrey'>Please enter your e-mail and password:</p>
        <form className='flex flex-col gap-6 w-full mt-8' onSubmit={LoginHandler}>
            <input className=' border border-grey p-2' type='email' placeholder='Email' name='email' onChange={changeHandler} ></input>
            <input className=' border border-grey p-2' type='password' placeholder='Password' name='password' onChange={changeHandler} ></input>
            <div className='div w-full flex justify-end underline text-sm underline-offset-4'>
                <Link to="/password/forgot" className=''>Forgot your Password?</Link>
            </div>
            <button className='border text-white bg-black p-3 rounded-full hover:bg-red delay-100'>Login</button>
        </form>
        <div className='text-sm flex gap-1'>
            <p>New Customer?</p>
            <p className='underline underline-offset-4 cursor-pointer' onClick={()=> navigate('/signup') }>Register</p>
        </div>
        </div>
    </div>
  )
}

export default Login