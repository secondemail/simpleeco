"use client"
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../_context/CartContext'
import { deleteUserCart } from '../_utila/CartApi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import notify from '../_components/Notification'
import { Flip, ToastContainer } from 'react-toastify'
import { MoonLoader } from 'react-spinners'
import Image from 'next/image'

const Cart = () => {
  const [pressed,setPressed]=useState(false)
  const [pressed2,setPressed2]=useState(false)
  const [loading,setLoading]=useState(true)
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext)
  const getTotalAmount = () => {
    let total = 0
    cart?.forEach((item) => {
      total += item?.product?.attributes?.price
    })
    return total
  }

  const deleteProductCart = (id) => {
    setPressed2(true)
    deleteUserCart(id).then(res => {
      if (res) {
        setCart((oldCart) => oldCart.filter(item => item.id !== res?.data?.data?.id))
        if (res.status === 200) {
          notify("Successfully Removed", "success")
          setPressed2(false)
        } else {
          notify("Something Went Wrong", "error")
          setPressed2(false)
        }
      }
    })
  }

  useEffect(() => {
    if(cart.length>0){
      setLoading(false)
    }
  },[cart])

  return (
    <div>
      {
        !loading?
        cart && cart.length>0 ?
          (
            <section>
              <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="mx-auto max-w-3xl">
                  <header className="text-center">
                    <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
                  </header>
                  <div className="mt-8">
                    <ul className="space-y-4">
                      {cart?.map((item) =>(
                        <li key={item.id} className="flex items-center gap-4">
                          <Image
                            width={150}
                            height={150}
                            src={item?.product?.attributes?.banner?.data?.attributes?.formats?.small?.url}
                            alt="kjskd"
                            className="size-16 rounded object-cover"
                          />

                          <div>
                            <h3 className="text-sm text-gray-900">Basic Tee 6-Pack</h3>

                            <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                              <div>
                                <dt className="inline">Category:</dt>
                                <dd className="inline">{ item?.product?.attributes?.category }</dd>
                              </div>
                            </dl>
                          </div>

                          <div className="flex flex-1 items-center justify-end gap-2">
                            <div className="font-bold text-[20px]" >
                              ${ item?.product?.attributes?.price }
                            </div>
                            {
                              !pressed2 ?
                                (
                                  <button onClick={()=>deleteProductCart(item?.id)} className="text-gray-600 transition hover:text-red-600">
                                    <span className="sr-only">Remove item</span>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="h-4 w-4"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                      />
                                    </svg>
                                  </button>
                                ) :
                                (
                                  <MoonLoader
                                    color="#08D9D6"
                                    size={20}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                  />
                                )
                            }
                          </div>
                        </li>
                      ))
                      }
                    </ul>

                    <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                      <div className="w-screen max-w-lg space-y-4">
                        <dl className="space-y-0.5 text-sm text-gray-700">
                          <div className="flex justify-between !text-base font-medium">
                            <dt>Total</dt>
                            <dd>$ { parseFloat(getTotalAmount()).toFixed(2) } </dd>
                          </div>
                        </dl>

                        <div className="flex justify-end">
                          <button
                            onClick={() => { router.push(`/checkout?amount=${getTotalAmount()}`);setPressed(true) }}
                            className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                            disabled={pressed}
                            style={{cursor:pressed?"not-allowed":"pointer"}}
                          >
                            Checkout
                          </button>
                        </div>
                      </div>
                    </div>
                    <h2 className='text-gray-400 font-bold'>Note:All Items Will Be Sent Via Email</h2>
                  </div>
                </div>
              </div>
            </section>
          )
          :
          (
            <div className="grid h-screen place-content-center bg-white px-4">
              <div className="text-center">
                <h1 className="text-9xl font-black text-gray-200">Uh-oh!</h1>

                <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Sorry! No Items In Your Cart</p>

                <Link
                  href="/"
                  className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
                >
                  Go Back Home
                </Link>
              </div>
            </div>
          ) 
          :
          (
            <div className='flex justify-center pt-10 mt-5'>
              <MoonLoader
                color="#08D9D6"
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )
      }
      <ToastContainer position="top-center" autoClose={1000} theme="colored" transition={Flip} />
    </div>
  )
}

export default Cart
