import React, { useState } from 'react'
import { Button } from "./index"
import { useSelector } from 'react-redux'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Addtask = () => {
  const [taskData, setTaskData] = useState({
    title:'',
    description:''
  });
  const navigate = useNavigate()
  const URL = process.env.REACT_APP_SERVER_URL
  const handleSubmit = async(e)=> {
    e.preventDefault();
    try {
      if(taskData.title && taskData.description){
        const res = await axios.post(`${URL}task/create`, taskData, {
          headers: { 'content-type': 'application/x-www-form-urlencoded' }
        });
        navigate('/home')
      }else{
        alert('All fields are required!')
      }
    } catch (error) {
      alert('Some error occured')
    }
  }
    const authStatus = useSelector(store => store.user.online);
    // if(!authStatus){
    //     return <h1>Please Logged in to post or view your tasks</h1>
    // }
  return (
    <form className='w-1/2 items-center text-center justify-center mx-auto mt-5' onSubmit={(e)=> handleSubmit(e)}>
        <label className='inline-block mb-1 pl-1' 
            htmlFor='title'>Title :</label>
        <input
            type='password'
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`}
            placeholder='type your title here'
            id='title'
            value={taskData.title}
            onChange={(e)=> {
              setTaskData({
                ...taskData,
                title:e.target.value
              })
            }}
            required
            />
            <label className='inline-block mb-1 pl-1' 
            htmlFor='description'>Description :</label>
        <textarea
        rows={8}
            type='text'
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`}
            placeholder='type your description here'
            id='description'
            value={taskData.description}
            onChange={(e)=> {
              setTaskData({
                ...taskData,
                description:e.target.value
              })
            }}
            required
            />
            <Button type='submit' className='w-full mt-5'>Save Task</Button>
    </form>
  )
}

export default Addtask