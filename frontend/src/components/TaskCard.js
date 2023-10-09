import React from 'react'
import {Button} from './index'
import { useNavigate } from 'react-router-dom'
const TaskCard = ({ id, title, description }) => {
    const navigate = useNavigate()
  return (
    <div className='sm:w-80 border-black border p-3 rounded-lg sm:h-96 relative overflow-y-hidden w-[80%] h-[26rem]'>
        <h1 className='font-bold text-center text-xl'>{title}</h1>
        <p className='font-extralight text-xl text-justify overflow-hidden flex flex-wrap my-2 sm:h-64 h-72'>{description}</p>
        <Button type='button' className='sm:top-[86%] absolute sm:left-52 top-[88%] left-60' onClick={()=> {
            navigate(`/viewtask/:${id}`)
        }}>View More</Button>
    </div>
  )
}

export default TaskCard