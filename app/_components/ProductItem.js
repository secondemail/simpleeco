import React from 'react'
import Image from 'next/image'
import { List } from 'lucide-react'
import Link from 'next/link'

const ProductItem = ({ product }) => {
  return (
    <Link href={`/product-details/${product?.id}`} className='p-1 relative border-teal-400 rounded-lg hover:border hover:shadow-md hover:cursor-pointer '>
      {
        product?.attributes?.banner?.data?.attributes?.url ?
          (
            <Image
              src={product?.attributes?.banner?.data?.attributes?.url}
              width={400}
              height={350}
              alt="img1"
              className='rounded-t-lg h-[170px]'
            />
          ) :
          (<div className='w-[400px] h-[170px] bg-slate-200 rounded-t-lg animate-pulse'></div>)
      }
      <div className='flex justify-between p-3 items-center bg-gray-50 rounded-b-lg'>
        <div>
          <h2 className='text-[16px] font-bold line-clamp-1'>
            {product?.attributes?.title}
          </h2>
          <h2 className='text-[10px] font-bold text-gray-400 flex gap-2 items-center'>
            <List className='h-5 w-5' /> {product?.attributes?.category}
          </h2>
        </div>
        <h3 className='absolute top-3 right-3 p-2  bg-teal-500 text-white rounded-full '>
          ${product?.attributes?.price}
        </h3>
    </div>
    </Link>
  )
}

export default ProductItem
