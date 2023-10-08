import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../store/userSlice'

const Logout = () => {
    const dispatch = useDispatch()
    const handleLogout = ()=> {
        dispatch(logout())
    }
  return (
    <div className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full font-medium hover:text-black cursor-pointer' onClick={handleLogout}>Logout</div>
  )
}

export default Logout