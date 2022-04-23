import React from 'react'
import icon from '../assets/crime.png'

const Frames = () => {
  return (
    <div className=' pointer-events-none fixed w-screen h-screen top-0 left-0'>
      <div className=' hidden md:block md:w-20 fixed md:bottom-12 md:left-20'>
        <img src={icon} alt='auth icon' />
      </div>
    </div>
  )
}

export default Frames
