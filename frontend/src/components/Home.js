import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {

    const token = localStorage.getItem('token');

    return token ? (
        <div className='flex flex-col items-center justify-center h-[88vh]'>
            <h1 className='bg-blue-900 text-white p-4 rounded-lg'>Welcome to your Homepage </h1>
            <p className='m-2'>Click on Add Task to post a task or to view tasks click on List Tasks</p>
        </div>
    ):(<div className='flex flex-col items-center justify-center h-[88vh]'>
        <h1 className='text-blue-900 text-2xl font-semibold hover:text-blue-300 cursor-pointer'>Logged in to post or view task</h1>
    </div>)
}

export default Home