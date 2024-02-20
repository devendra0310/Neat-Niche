import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    
    const {storeTokenLS} = useAuth()

    const [user,setUser]=useState({
        name:"",
        email:"",
        password:""
    })
    async function SubmitHandler(e){
        e.preventDefault();

        try{
            const response = await fetch('/api/v2/register',{
                method:'POST',
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            })
            const result = await response.json();
            if(result.success){
                storeTokenLS(result?.token);
                navigate('/')
            }
        }
        catch(error){
            console.log(error);
        }
    }
    function changeHandler(e){
        setUser({...user,[e.target.name]: e.target.value});
    }
    const navigate=useNavigate();
  return (
    <div className='w-screen'>
        <div className='flex flex-col mx-auto items-center mt-20 mb-20 gap-4 w-1/3 font-light' >
        <h1 className="text-[40px] font-light">Register</h1>
        <p className='font-light text-darkgrey'>Please fill in the fields below:</p>
        <form className='flex flex-col gap-6 w-full mt-8' onSubmit={SubmitHandler}>
            <input className=' border border-grey p-2' type='text' placeholder='Name' name='name' onChange={changeHandler} ></input>
            <input className=' border border-grey p-2' type='email' placeholder='Email' name='email' onChange={changeHandler} ></input>
            <input className=' border border-grey p-2' type='text' placeholder='Password' name='password' onChange={changeHandler} ></input>
            <button className='border text-white bg-black p-3 rounded-full hover:bg-red delay-100'>Create</button>
        </form>
        <div className='text-sm flex gap-1'>
            <p>Already a Member?</p>
            <p className='underline underline-offset-4 cursor-pointer' onClick={()=> navigate('/login') }>Login</p>
        </div>
        </div>
    </div>
  )
}

export default Signup