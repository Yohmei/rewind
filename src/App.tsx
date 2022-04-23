import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Typed from 'typed.js'
import Frames from './components/Frames'
import Heading from './html_elements/Heading'
import { sign_out, useAuth } from './providers/auth_provider'

function App() {
  const token = useAuth()
  const typed_el = React.useRef(null)
  const [is_entered, set_is_entered] = useState<boolean>(false)
  const [link_state, set_link_state] = useState<{ curr_state: number; prev_state: number }>({
    curr_state: 0,
    prev_state: 0,
  })
  const links = ['Sign In', 'Sign Up']

  const click_link = (i: number) => {
    const prev_state = link_state.curr_state
    set_link_state({ curr_state: i, prev_state })
  }

  useEffect(() => {
    if (typed_el.current)
      new Typed(typed_el.current, {
        strings: ['Auth Rewind', ''],
        typeSpeed: 100,
        backDelay: 700,
        showCursor: false,
        onComplete: () => {
          set_is_entered(true)
        },
      })
  }, [])

  return (
    <div className='text-xiketic w-screen h-screen font-general font-medium bg-orange-50 flex items-center flex-col justify-center'>
      {!is_entered && (
        <div className=' fixed w-screen h-screen left-0 top-0 z-10 bg-orange-50 flex justify-center items-center'>
          <h1 ref={typed_el} className=' text-9xl text-center font-extrabold tracking-wider'></h1>
        </div>
      )}
      <Frames />
      <Outlet />
      <nav className='fixed bottom-14 right-48 md:right-96 w-fit h-fit'>
        {token ? (
          <Heading className={''}>
            <span onClick={sign_out}>Logout</span>
          </Heading>
        ) : (
          links.map((link, i) => {
            let class_name = ''
            if (i !== link_state.curr_state)
              class_name = ' !left-14 !bottom-12 !text-3xl md:!left-24 md:!bottom-20 opacity-50 md:!text-5xl'

            return (
              <span key={i} onClick={() => click_link(i)}>
                <Heading className={class_name}>
                  <Link className='whitespace-nowrap' to={`/${link.toLowerCase().replace(' ', '-')}`}>
                    {' '}
                    {link}
                  </Link>
                </Heading>
              </span>
            )
          })
        )}
      </nav>
    </div>
  )
}

export default App
