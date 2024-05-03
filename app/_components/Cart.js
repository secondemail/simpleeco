import React, { useContext } from 'react'
import { CartContext } from '../_context/CartContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Cart = () => {
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext)
  const getTotalAmount = () => {
    let total = 0
    cart?.forEach((item) => {
      total += item?.product?.attributes?.price
    })
    return total
  }
  if (cart) {
    console.log(cart)
  }
  
  return (
    <div 
      className='
        h-[300px]
        w-[250px]
        bg-gray-100
        z-10 rounded-md
        border shadow-sm
        absolute
        mx-10
        right-10
        top-12
        p-5
        overflow-auto'
    >
        {
          cart && cart.length > 0 ?
            (
              <div>
                <div>
                  <ul>
                    {cart?.map((item) => ( 
                      <li key={item?.id} className="flex items-center gap-4 border-b-2 py-3">
                        <Image
                          width={150}
                          height={150}
                          src={item?.product?.attributes?.banner?.data?.attributes?.formats?.thumbnail?.url}
                          alt="sdsd"
                          className="size-16 rounded object-cover"
                        />

                        <div>
                          <h3 className="text-sm text-gray-900 line-clamp-1">{ item?.product?.attributes?.title }</h3>

                          <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                            <div>
                              <dt className="inline">Category:</dt>
                              <dd className="inline">{ item?.product?.attributes?.category }</dd>
                            </div>

                            <div>
                              <dt className="inline">Price:</dt>
                              <dd className="inline">{ item?.product?.attributes?.price }</dd>
                            </div>
                          </dl>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4 text-center mt-5">
                  <Link
                    href="/cart"
                    className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
                  >
                    View my cart ({cart?.length})
                  </Link>

                  <button
                    onClick={()=>router.push(`/checkout?amount=${getTotalAmount()}`)}
                    className="block w-full rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                  >
                    Checkout
                  </button>

                  <Link
                    href="/"
                    className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
                  >
                    Continue shopping
                  </Link>
                </div>
              </div>
            ):(<h2 className='text-center mt-20'>No Items</h2>)
        }
    </div>
  )
}

export default Cart