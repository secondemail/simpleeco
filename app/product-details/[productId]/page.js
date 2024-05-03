"use client"

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BreadCrumb from './../../_utila/BreadCrumb';
import ProductBanner from './../_components/ProductBanner';
import ProductInfo from './../_components/ProductInfo';
import ProductsList from "../../_components/ProductsList";
import { getProductById, getProductsByCategory } from "../../_utila/ProductApi";
import { MoonLoader } from 'react-spinners';


const ProductDetails = ({ params }) => {
  const path = usePathname();
  const [productDetails,setProductDetails]=useState([])
  const [productList, setProductList] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    getProductById(params?.productId).then(res=>{
      setProductDetails(res.data.data)
      getCatProducts(res.data.data)
    })
    setLoading(true);
    const getCatProducts = (product) => {
      getProductsByCategory(product?.attributes?.category).then(res => {
        setProductList(res?.data?.data);
        setLoading(false);
      })
    }
  }, [])
  
  
  return (
    <div className='px-10 py-8 md:px-28'>
      <BreadCrumb path={path} />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-0 '>
        <ProductBanner product={productDetails} />
        <ProductInfo product={productDetails}/>
      </div>
      <div>
        <h2 className='n mt-24 text-2xl font-bold' >Similar Products</h2>
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
    </div>
  )
}

export default ProductDetails