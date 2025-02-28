import { Loader2 } from 'lucide-react'
import React from 'react'

const loading = () => {
  return (
    <div className='flex h-screen w-full justify-center'>
      <Loader2 className=' animate-spin'/>
    </div>
  )
}

export default loading