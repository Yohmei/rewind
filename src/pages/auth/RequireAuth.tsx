import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { get_auth, useAuth } from '../../providers/auth_provider'

axios.interceptors.request.use(
  (request) => {
    const authorization = get_auth()

    if (authorization) {
      // request.headers.set('Authorization', authorization),
      request.headers = { authorization }
    }

    return request
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate()
  const token = useAuth()

  useEffect(() => {
    if (token !== null) navigate('/user', { replace: true })
    else navigate('/sign-in', { replace: true })
  }, [token])

  return children
}

export default RequireAuth
