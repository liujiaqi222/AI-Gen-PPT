import React, { PropsWithChildren, } from 'react'

const layout = ({children}:PropsWithChildren) => {
  return (
    <div className='bg-gradient-to-br from-lime-400 to-cyan-400 w-full min-h-screen flex items-center justify-center'>{ children}</div>
  )
}

export default layout