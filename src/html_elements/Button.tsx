import React from 'react'

const Button = ({
  children,
  className,
  onClick,
  ...props
}: {
  children: string
  className?: string
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
  [props: string]: any
}) => {
  return (
    <button
      onClick={onClick}
      className={` bg-white px-7 rounded-lg text-xl font-bold text-xiketic text-opacity-70 border-4 border-xiketic border-opacity-10  active:bg-orange-50 w-fit ${className}`}
      {...props}
    >
      <span>{children.toUpperCase()}</span>
    </button>
  )
}

export default Button
