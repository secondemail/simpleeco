'use client'
import React, { useEffect, useState } from 'react'
import ProductsList from './ProductsList'
import { getLatestProducts } from '../_utila/ProductApi'
import { MoonLoader } from 'react-spinners';


const ProductSection = () => {
  const [productList, setProductList] = useState([]);
  const [loading,setLoading]=useState(true)
  useEffect(() => {
    setLoading(true);
    getLatestProducts().then(res=>{
      setProductList(res.data.data)
      setLoading(false);
    })
  }, [])

  return (
    <div className='px-10 md:px-20'>
      <div className=' items-center'>
        <h1 className='my-4 text-[15px] font-bold sm:text-xl '>Our Products</h1>
      </div>
      {
        !loading ?
          (<ProductsList productList={productList} />)
          :
          (
            <div className='flex justify-center pt-10'>
              <MoonLoader
                color="#08D9D6"
                size={120}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )
      }
    </div>
  )
}

export default ProductSection
