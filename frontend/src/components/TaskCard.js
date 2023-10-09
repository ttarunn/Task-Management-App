import React from 'react'
import {Button} from './index'
import { useNavigate } from 'react-router-dom'
const TaskCard = ({ id, title, description }) => {
    const navigate = useNavigate()
  return (
    <div className='sm:w-80 border-blue-900 border-2 p-3 rounded-lg sm:h-96 overflow-y-hidden w-[80%] h-[26rem] shadow-lg'>
        <h1 className='font-bold text-center text-xl h-12 text-blue-600'>{title}</h1>
        <p className='font-extralight text-xl text-justify overflow-hidden flex flex-wrap my-2 sm:h-64 h-72'>{description}</p>
        <div className='w-full text-center'>
        <Button type='button' onClick={()=> {
            navigate(`/viewtask/:${id}`)
        }}>View More</Button>
        </div>
    </div>
  )
}

export default TaskCard