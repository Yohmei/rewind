import React, { ChangeEvent } from 'react'
import Button from '../../../html_elements/Button'
import Form from '../../../html_elements/Form'
import Input from '../../../html_elements/Input'
import InputBtn from '../../../html_elements/InputBtn'

const AccForm = ({
  submit,
  name,
  on_change,
}: {
  submit: (event: React.SyntheticEvent) => Promise<void>
  name: string
  on_change: (event: ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <>
      <Form onSubmit={submit} className='justify-center'>
        <Input
          type={'text'}
          name={'name'}
          id={'name'}
          placeholder={'enter your name'}
          value={name}
          on_change={on_change}
        ></Input>
        <InputBtn>submit</InputBtn>
      </Form>
    </>
  )
}

export default AccForm
