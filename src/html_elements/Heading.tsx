import React from 'react'

const Heading = ({ children, className }: { children: any; className: string }) => {
  return (
    <h1
      className={` text-5xl md:text-7xl transition-all font-extrabold absolute left-0 bottom-0 cursor-pointer ${className}`}
    >
      {children}
    </h1>
  )
}

export default Heading
