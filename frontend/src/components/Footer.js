import React from 'react'
import { FaHome } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
import { IoCall } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFlickr } from "react-icons/fa";
import Maestro from '../images/maestro.png';
import Visa from '../images/visa.png';
import Paypal from '../images/paypal.jpeg'
import Rupay from '../images/rupay.png'

const Footer = () => {
  return (
    <div>
        <div className=' bg-lightgrey footer flex justify-around pt-16 pb-16'>
            <div className='flex flex-col gap-3'>
                <p className='font-bold'>CONTACT US</p>
                <div className='flex gap-3'>
                    <div className='text-[#71717a] flex items-center gap-1'>
                    <FaHome/>
                    <span>Address:</span>
                    </div>
                    <div className='text-[#71717a] font-light'>No 38 Hanuwant Nagar, Gokulpura, Jaipur, Rajasthan</div>
                </div>
                <div className='flex gap-3'>
                    <div className='text-[#71717a] flex items-center gap-1'>
                    <BsFillSendFill/>
                    <span>Mail Us:</span>
                    </div>
                    <div className='text-[#71717a] font-light'>contact@magentech.com</div>
                </div>
                <div className='flex gap-3'>
                    <div className='text-[#71717a] flex items-center gap-1'>
                    <IoCall/>
                    <span>Phone:</span>
                    </div>
                    <div className='text-[#71717a] font-light'>(+91) 8769028559</div>
                </div>

            </div>

            <div className='flex flex-col justify-start gap-3 font-light'>
            <p className='font-bold'>OUR SERVICES</p>
                <a href="/">Jaipur</a>
                <a href="/">Udaipur</a>
                <a href="/">Delhi</a>
                <a href="/">Chandigarh</a>
                <a href="/">Kota</a>
            </div>

            <div className='flex flex-col justify-start gap-3 font-light'>
            <p className='font-bold'>EXTRAS</p>
                <a href="/">About Store</a>
                <a href="/">New Collection</a>
                <a href="/">Contact Us</a>
                <a href="/">Latest News</a>
                <a href="/">Our Sitemap</a>
            </div>

            <div className='flex flex-col justify-start gap-3 font-light'>
                <p className='font-bold'>MY ACCOUNT</p>
                <a href="/">About Store</a>
                <a href="/">New Collection</a>
                <a href="/">Contact Us</a>
                <a href="/">Latest News</a>
                <a href="/">Our Sitemap</a>
            </div>
        </div>

        <div className='flex justify-around pt-10 pb-10 items-center'>
            <div className='flex flex-col'>
            <span className='text-[#71717a]'>SIGN UP FOR</span>
            <span className='font-bold text-[30px]'>NEWSLETTER</span>
            </div>
            <form className='flex items-end text-[#71717a]'>
            <input className='border-b-2 border-[#71717a] w-[300px] font-light outline-none' type='text' placeholder='Enter your email' name='email'></input>
            <button className='text-[#ffffff] bg-[#000000] p-2 text-[10px] hover:bg-red'>SUBSCRIBE</button>
            </form>
            <div className='flex gap-4 text-darkgrey text-[25px]'>
            <a href='/#' className='red'><FaFacebookF/></a>
            <a href='/#' className='red'><FaTwitter/></a>
            <a href='/#' className='red'><FaPinterest/></a>
            <a href='/#' className='red'><FaGoogle/></a>
            <a href='/#' className='red'><FaLinkedin/></a>
            <a href='/#' className='red'><FaFlickr/></a>
            </div>
        </div>

        <div className='flex justify-between items-center pl-28 pr-28 pt-10 pb-10 bg-[#f5f5f5]'>
            <div>Made with 💚 by devendra</div>
            <div className='flex gap-4  items-baseline'>
                <div className='w-[40px] h-[40px] relative top-1'><img src={Maestro} alt='card'></img></div>
                <div className='w-[50px] h-[50px]'><img src={Paypal} alt='card'></img></div>
                <div className='w-[50px] h-[50px]'><img src={Rupay} alt='card'></img></div>
                <div className='w-[50px] h-[50px]'><img src={Visa} alt='card'></img></div>
            </div>
        </div>
        
    </div>
  )
}

export default Footer