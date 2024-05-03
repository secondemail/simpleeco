import React, { useEffect } from 'react'
import ProductItem from './ProductItem'

const ProductsList = ({ productList }) => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3'>
      {
        productList?.map((i, index) => (<ProductItem key={i.id} product={i}/>) )
      }
    </div>
  )
}

export default ProductsList