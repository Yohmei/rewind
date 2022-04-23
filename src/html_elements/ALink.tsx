import React from 'react'

const ALink = ({ children, to }: { children: any; to: string }) => {
  return (
    <a href={to} className='text-crayola underline inline-block mr-2 hover:no-underline underline-offset-1'>
      {children}
    </a>
  )
}

export default ALink
