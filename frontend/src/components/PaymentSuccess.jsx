import React from 'react'
import { useSearchParams } from 'react-router-dom'
import Heading from './Heading'
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const PaymentSuccess = () => {
    const searchQuery = useSearchParams()[0]
    const referenceNumber = searchQuery.get("reference")
  return (
    <div className=' h-screen'>
        <Heading/>
        <div className="flex items-center justify-center mt-[15%]">
            <div className="text-center bg-gray-200 p-8 rounded shadow-md">
                <p className="text-2xl font-bold mb-4">Payment Success <CheckBoxIcon className='text-green-700'/></p>
                <p className=" text-red-500">Reference number {referenceNumber}</p>
            </div>
        </div>
    </div>
  )
}

export default PaymentSuccess