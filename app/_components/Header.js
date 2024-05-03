"use client"
import React,{useState,useEffect,useContext} from 'react'
import Image from 'next/image'
import { useUser } from "@clerk/clerk-react";
import {UserButton} from "@clerk/nextjs";
import { ShoppingCart } from 'lucide-react';
import logo2 from '../../public/IMG_20240429_142508.png'
import { CartContext } from '../_context/CartContext';
import { getUserCart } from '../_utila/CartApi';
import Cart from './Cart';
import Link from 'next/link';

const Header = () => {
  const { user } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [openCart, setOpenCart] = useState(false); 
  const { cart, setCart } = useContext(CartContext);
  useEffect(() => {
    if(window.location.href.toString().includes('sign-in') || window.location.href.toString().includes('sign-up')){
      setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false)
    }
  }, []) 

  useEffect(() => {
    user&&getCartItems()
  }, [user]) 
  
  const getCartItems = () => {
    getUserCart(user.primaryEmailAddress.emailAddress).then(res => {
      res?.data?.data.forEach(element => {
        setCart((oldCart) => [
          ...oldCart, {
            id: element.id,
            product:element?.attributes?.products?.data[0]
          }
        ])
      });
    })
  }
  
  return !isLoggedIn && (
    <header className="bg-white shadow-md">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <Image src={logo2} alt="logo" width={80} height={50}  />
        </Link>
        <div className="flex flex-1 items-center justify-end md:justify-end">
          <div className="flex items-center gap-4">
              {
                !user?
                (
                  <div className="sm:flex sm:gap-4">
                    <a
                      className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-600"
                      href="/sign-in"
                    >
                      Login
                    </a>
                    <a
                      className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
                      href="/sign-up"
                    >
                      Register
                    </a>
                  </div>
                ):
                (
                  <div className='flex items-center gap-5'>
                    <div onMouseOver={() => setOpenCart(true)} onMouseLeave={()=>setOpenCart(false)} >
                      <h2 onMouseEnter={()=>setOpenCart(!openCart)} onMouseLeave={()=>setOpenCart(!openCart)} className='flex gap-2 text-[15px] cursor-pointer'><ShoppingCart/>({cart?.length})</h2>
                      {
                        openCart?(<Cart/>):null
                      }
                    </div>
                    <UserButton afterSignOutUrl="/" />
                  </div>
                )
              }
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header