import React from 'react'
import { NavLink } from "react-router-dom"
import logo from '../images/logo.png'
import { IoSearch } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../redux/slices/userSlice'
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const navigate=useNavigate();
    const {isloggedin, user, logoutUser} = useAuth()
  return (
    <div className='flex flex-col'>
        <div className='flex flex-row justify-end border-b-[0.5px] mt-2 mb-2 text-grey p-2  text-[13px]'>
            <h3 className='border-r-2 pr-2'>
                {
                    isloggedin ? (<span onClick={()=> navigate('/me')}>Hi {user.name} </span>) : (<span>Welcome Customer!</span>)
                }
            </h3>
            <h3 className='mr-3 pl-2 cursor-pointer' onClick={ isloggedin ? ()=>{logoutUser()} : ()=>{navigate('/login')} }>
                {
                    isloggedin ? (<span>Sign Out</span>) : (<span> Sign In</span>)
                }
            </h3>
        </div>
        <div className='flex flex-row justify-between m-4 align-baseline'>
            <NavLink to="/">
                <img src={logo} alt={logo} width={200}></img>
            </NavLink>
            <ul className='flex gap-4'>
                <li className='hover:text-[#ef4444] hover:border-b-2'>
                    <NavLink to="/">HOME</NavLink>
                </li>
                <li className='hover:text-[#ef4444] hover:border-b-2'>
                <NavLink to="/electronic">ELECTRONIC</NavLink>
                </li>
                <li className='hover:text-[#ef4444] hover:border-b-2'>
                <NavLink to="/collection">COLLECTION</NavLink>
                </li>
                <li className='hover:text-[#ef4444] hover:border-b-2'>
                <NavLink to="/accessories">ACCESSORIES</NavLink>
                </li>
                <li className='hover:text-[#ef4444] hover:border-b-2'>
                <NavLink to="/contactus">CONTACT US</NavLink>
                </li>
            </ul>
            <div className='flex gap-5'>
                <IoSearch onClick={()=>{navigate('/search')}} className="text-[25px] cursor-pointer"/>
                <HiOutlineShoppingBag className="text-[25px] cursor-pointer"/>
            </div>
        </div>
    </div>
  )
}

export default Header