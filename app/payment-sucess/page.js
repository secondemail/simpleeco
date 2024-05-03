import Image from 'next/image'
import React from 'react'

const PaymentSuccess = () => {
  return (
    <div>
      <div className='flex flex-col items-center justify-center px-5 mt-4' >
        <Image  src="/veri.gif" width={300} height={150} alt='verasi' unoptimized />
        <h1 className='font-bold text-[27px] text-green-600'>Payment Sucess</h1>
        <h2 className='text-gray-400'>Note:All Items Will Be Sent Via Email</h2>
        <a href='/' className='bg-primary p-2 text-white rounded-md mt-3'>
          Go Home
        </a>
      </div>
    </div>
  )
}

export default PaymentSuccess