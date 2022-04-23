import React, { ChangeEvent, useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import Form from '../../html_elements/Form'
import Input from '../../html_elements/Input'
import InputBtn from '../../html_elements/InputBtn'
import { sign_in, sign_up } from '../../providers/auth_provider'

const SignIn = () => {
  const [username, set_username] = useState<string>('')
  const [password, set_password] = useState<string>('')
  const [is_authorized, set_is_authorized] = useState<string | undefined>('')
  const location = useLocation()
  const username_input_ref = React.createRef<HTMLInputElement>()

  const focus_username = () => {
    username_input_ref.current && username_input_ref.current.focus()
  }

  const on_change = (event: ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter(event.target.value)
  }

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (location.pathname === '/sign-in') set_is_authorized(await sign_in({ username, password }))
    else if (location.pathname === '/sign-up') sign_up({ username, password })
  }

  useEffect(() => {
    focus_username()
  }, [])

  useEffect(() => {
    if (is_authorized === 'unauthorized')
      setTimeout(() => {
        set_is_authorized('')
      }, 1000)
  }, [is_authorized])

  return (
    <div className=' relative w-screen h-screen flex justify-center items-center flex-col'>
      <Form onSubmit={submit} className='mt-14'>
        <Input
          type='text'
          name='username'
          id='username'
          placeholder='username'
          value={username}
          ref={username_input_ref}
          on_change={(event) => on_change(event, set_username)}
        />
        <Input
          type='password'
          name='password'
          id='password'
          placeholder='password'
          value={password}
          on_change={(event) => on_change(event, set_password)}
        />
        <InputBtn className={' mt-2'}>submit</InputBtn>
      </Form>
      {is_authorized && (
        <div className=' fixed top-0 left-0 w-screen h-screen flex items-center justify-center'>
          <div className=' text-9xl font-bold text-red-500 -rotate-12'>WRONG</div>
        </div>
      )}
    </div>
  )
}

export default SignIn
