import React from 'react'
import { logo } from '../assets/index'
const Logo = () => {
  return (
    <div className='ml-2'>
      <img src={logo} alt='logo' className='w-16 h-10'/>
    </div>
  )
}

export default Logo