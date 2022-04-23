import React, { FormEventHandler } from 'react'

const Form = ({
  children,
  onSubmit,
  className,
  ...props
}: {
  children: any
  onSubmit: FormEventHandler<HTMLFormElement>
  className: string
  [props: string]: any
}) => {
  return (
    <form onSubmit={onSubmit} className={`flex flex-col items-center w-screen h-1/2 ${className}`} {...props}>
      {children}
    </form>
  )
}

export default Form
