import Image from 'next/image'
import React from 'react'

const ProductBanner = ({product}) => {
  return (
    <div>
      {
        product?.attributes?.banner?.data?.attributes?.url ?
          (
            <Image
              src={product?.attributes?.banner?.data?.attributes?.url}
              width={400}
              height={400}
              style={{ width: "400px", height: "400px" }}
              alt="im1asa"
              className='rounded-lg flex'
            />
          ) :
          (
            <div className='w-[300px] h-[400px] bg-slate-200 rounded-lg animate-pulse'></div>
          )
      }
    </div>
  )
}

export default ProductBanner