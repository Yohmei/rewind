import React, { ChangeEvent, ForwardedRef, RefObject } from 'react'

const Input = React.forwardRef(
  (
    {
      type,
      name,
      id,
      placeholder,
      value,
      on_change,
    }: {
      type: string
      name: string
      id: string
      placeholder: string
      value: string
      on_change: (event: ChangeEvent<HTMLInputElement>) => void
    },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        ref={ref}
        onChange={on_change}
        required
        className=' bg-transparent bg-gradient-to-r from-transparent via-orange-100 to-transparent px-3 p-1 rounded-xl text-sm font-medium mb-10 h-1/3 w-3/5 text-xiketic text-4xl md:text-5xl text-center placeholder:text-xiketic placeholder:opacity-30 focus-visible:outline-none focus-visible:via-orange-200 transition-colors'
      />
    )
  }
)

export default Input
