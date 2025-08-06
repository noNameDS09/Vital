'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
    const router = useRouter();
  return (
    <div className='text-center mt-20 flex h-[80vh] justify-center items-center'>
        <button 
        className='bg-red-600 px-3 py-2 rounded-2xl cursor-pointer'
        onClick={()=> router.push('/logout')}
        >
            Logout
        </button>
    </div>
  )
}

export default page