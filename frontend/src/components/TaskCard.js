import React from 'react'
import {Button} from './index'
import { useNavigate } from 'react-router-dom'
const TaskCard = ({ id, title, description }) => {
    const navigate = useNavigate()
  return (
    <div className='w-80 border-black border p-2 rounded-lg h-96 relative overflow-y-hidden'>
        <h1 className='font-bold text-center text-xl'>{title}</h1>
        <p className='font-extralight text-xl text-justify overflow-hidden flex flex-wrap my-2 h-64'>{description}</p>
        <Button type='button' className='top-[86%] absolute left-52' onClick={()=> {
            navigate(`/viewtask/:${id}`)
        }}>View More</Button>
    </div>
  )
}

export default TaskCard