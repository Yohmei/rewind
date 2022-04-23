import React from 'react'

const InputBtn = ({ children, className }: { children: string; className?: string }) => {
  return (
    <input
      type='submit'
      value={children.toUpperCase()}
      className={` bg-white px-7 rounded-lg text-xl font-bold text-xiketic text-opacity-70 border-4 border-xiketic border-opacity-10  active:bg-orange-50 w-fit ${className}`}
    ></input>
  )
}

export default InputBtn
