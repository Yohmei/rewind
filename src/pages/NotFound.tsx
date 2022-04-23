import React from 'react'
import Frames from '../components/Frames'
import ALink from '../html_elements/ALink'

const NotFound = () => {
  return (
    <div className='text-xiketic w-screen h-screen font-general font-medium bg-orange-50 flex items-center flex-col justify-center'>
      <Frames />
      <div className=' text-4xl flex flex-col justify-center items-center'>
        <div className='mb-10 text-8xl'>😞</div>
        <p className='mb-10'>The page you were looking for does not belong here.</p>
        <div>
          <ALink to={'/'}>Return Home</ALink>
        </div>
      </div>
    </div>
  )
}

export default NotFound
