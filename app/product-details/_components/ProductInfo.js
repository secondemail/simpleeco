import React,{useContext, useState} from 'react'
import { AlertOctagon, BadgeCheck, ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/clerk-react';
import { addToCart } from '../../_utila/CartApi';
import { CartContext } from '../../_context/CartContext';
import notify from './../../_components/Notification';
import { Flip, ToastContainer } from 'react-toastify';
import { HashLoader } from 'react-spinners';

const ProductInfo = ({product}) => {
  const {user}=useUser();
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  const handelAddCart =()=>{
    if (!user) {
      router.push('/sign-in')
    } else {
      const data = {
        data:{
          username: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          products:[product?.id]
        }
      }
      setLoading(true);
      addToCart(data).then(res => {
        setCart(oldCart => [...oldCart, { id: res?.data?.data?.id, product }])
        if (res.status === 200) {
          notify("Successfully Added","success")
          setLoading(false);
        } else {
          notify("Something Went Wrong", "error")
          setLoading(false);
        }
      }).catch(err => {
      })
    }
  }
  return (
    <div>
      {
        product?.attributes?
        (
          <div>
            <h1 className='text-[25px] font-bold line-clamp-1'>{ product?.attributes?.title }</h1>
            <span className='text-gray-400 text-[12px]'>{ product?.attributes?.category }</span>
            <h2 className='text-[20px] mt-3'>{product?.attributes?.description[0]?.children[0]?.text}</h2>
            <h2 className='text-[13px] text-gray-500 flex gap-2 items-center'>
              {product?.attributes?.instantDelivery?(<BadgeCheck className='text-green-500'/>):(<AlertOctagon className='text-yellow-500'/>)}Eligible For Inistant Delivery
            </h2>
            <h2 className='text-[32px] font-bold text-primary mt-5'>$ {product?.attributes?.price}</h2>
            {
              !loading?
                (
                  <button onClick={handelAddCart} className='bg-primary flex p-3 rounded-md mt-2 gap-2 text-white hover:bg-teal-500 font-bold'>
                    <ShoppingCart/> Add to Cart
                  </button>
                ):
                (
                  <HashLoader
                    color="#08D9D6"
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                )
            }
          </div>
        ):
        (
          <div>
            <div className='w-[300px] h-[20px] bg-slate-200  animate-pulse mb-4 ' ></div>
            <div className='w-[100px] h-[20px] bg-slate-200  animate-pulse mb-4 ' ></div>
            <div className='w-[300px] h-[20px] bg-slate-200  animate-pulse mb-4 ' ></div>
            <div className='w-[300px] h-[20px] bg-slate-200  animate-pulse mb-4 ' ></div>
            <div className='w-[300px] h-[20px] bg-slate-200  animate-pulse mb-4 ' ></div>
            <div className='w-[100px] h-[20px] bg-slate-200  animate-pulse mb-4 ' ></div>
            <div className='w-[150px] h-[60px] bg-slate-200  animate-pulse mb-4 ' ></div>
          </div>
        )
      }
      <ToastContainer position="top-center" autoClose={1000} theme="colored" transition={Flip} />
    </div>
  )
}

export default ProductInfo
