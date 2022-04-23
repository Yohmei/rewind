import { create_subject } from '../subject'
import moment from 'moment'
import axios from 'axios'
import { User } from '../interfaces/Auth'
import { useEffect, useState } from 'react'

const auth_subject = create_subject()
const auth_observable = auth_subject.add_observable()

const set_local_storage = (res: { expires: string; token: string }) => {
  const { expires, token } = res
  const expires_moment = moment().add(expires)
  localStorage.setItem('Authorization', token)
  localStorage.setItem('expires', JSON.stringify(expires_moment.valueOf()))
}

const get_expiration = () => {
  const expires = localStorage.getItem('expires')

  if (expires) {
    const expiration = JSON.parse(expires)
    return moment(expiration)
  } else {
    return moment().subtract(1, 'days')
  }
}

export const get_auth = () => {
  if (localStorage) return localStorage.getItem('Authorization')
  else return null
}

export const is_token_expired = () => {
  return moment().isBefore(get_expiration())
}

export const sign_in = async (creds: { username: string; password: string }) => {
  try {
    const res = await axios.post('/api/sign-in', creds)
    const data: {
      user: User
      success: boolean
      token: string
      expires: string
    } = res.data
    set_local_storage(data)
    auth_observable.next(data.token)
    return undefined
  } catch (error) {
    const e = `${error}`
    if (e.includes('401')) return 'unauthorized'
  }
}

export const sign_up = async (creds: { username: string; password: string }) => {
  const res = await axios.post('/api/sign-up', creds)
  const data: {
    user: User
    success: boolean
    token: string
    expires: string
  } = res.data
  set_local_storage(data)
  auth_observable.next(data.token)
}

export const sign_out = () => {
  localStorage.removeItem('Authorization')
  localStorage.removeItem('expires')
  auth_observable.next(null)
}

export const useAuth = () => {
  const [token, set_token] = useState<string | null>(null)

  useEffect(() => {
    const auth_observer = auth_observable.subscribe((token: string) => {
      set_token(token)
    })

    set_token(get_auth())

    return () => auth_observer.unsubscribe()
  }, [])

  return token
}
