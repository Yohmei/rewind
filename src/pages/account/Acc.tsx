import axios from 'axios'
import React, { ChangeEvent, useEffect, useState } from 'react'
import Typed from 'typed.js'
import { sign_out, useAuth } from '../../providers/auth_provider'
import AccForm from './components/AccForm'

const Acc = () => {
  const [is_name_registered, set_is_name_registered] = useState<boolean>(false)
  const [fetched_user, set_fetched_user] = useState<boolean>(false)
  const [name, set_name] = useState<string>('')
  const [ready_to_destroy, set_ready_to_destroy] = useState<boolean>(false)
  const [time_to_destroy, set_time_to_destroy] = useState<number>(5)
  const token = useAuth()
  const typed_el = React.useRef(null)

  const countdown = () => {
    const interval = setInterval(() => {
      set_time_to_destroy(time_to_destroy - 1)
    }, 1000)

    setTimeout(() => {
      clearInterval(interval)
    }, 1000)

    return interval
  }

  const get_user = async () => {
    const res: { data: { success: boolean; user_name: string } } = await axios.get('/api/user')

    if (res.data.user_name !== '') {
      set_is_name_registered(true)
      set_fetched_user(true)
      set_name(res.data.user_name)
    }
  }

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    let server_response = {} as { data: { success: boolean } }
    if (token) server_response = await axios.post('/api/user/update-name', { name })

    set_is_name_registered(server_response.data.success)
  }

  const on_change = (event: ChangeEvent<HTMLInputElement>) => {
    set_name(event.target.value)
  }

  useEffect(() => {
    if (token) {
      get_user()
      if (ready_to_destroy) if (time_to_destroy > 0) countdown()

      if (time_to_destroy === 0) {
        setTimeout(() => {
          sign_out()
        }, 500)
      }
    }

    return () => clearInterval(countdown())
  }, [token, time_to_destroy, ready_to_destroy])

  useEffect(() => {
    if (is_name_registered && name && typed_el.current) {
      const sentence = `Hmmmmm... Hey ${name}!`

      new Typed(typed_el.current, {
        strings: [
          sentence,
          'You used your exclusive privilegies way too long dear Homo Sapien.',
          "I'm deleting your account in...",
          '',
        ],
        typeSpeed: 36,
        backDelay: 700,
        showCursor: false,
        onComplete: () => {
          set_ready_to_destroy(true)
        },
      })
    }
  }, [is_name_registered, name])

  return (
    <>
      {token && fetched_user && (
        <div className=' flex flex-col h-screen w-screen items-center justify-center'>
          {!is_name_registered && <AccForm submit={submit} name={name} on_change={on_change}></AccForm>}
          {is_name_registered && !ready_to_destroy && (
            <div ref={typed_el} className=' text-5xl w-2/3 text-center'></div>
          )}
          {is_name_registered && ready_to_destroy && (
            <div className=' text-red-400 text-9xl w-2/3 text-center'>{time_to_destroy}</div>
          )}
        </div>
      )}
    </>
  )
}

export default Acc
