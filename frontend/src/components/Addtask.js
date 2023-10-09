import React, { useState, useEffect } from 'react'
import { Button } from "./index"
import { useSelector } from 'react-redux'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';


const Addtask = () => {
  const [taskData, setTaskData] = useState({
    title:'',
    description:''
  });

  const [task, setTask] = useState({})
  const location = useLocation();
  const id = location.pathname.split(":")[1];
  const navigate = useNavigate()
  const token = localStorage.getItem('token');

  const URL = process.env.REACT_APP_SERVER_URL
  const handleSubmit = async(e)=> {
    e.preventDefault();
  
    try {
      if((taskData.title || task.title) && (taskData.description || task.description)){
        if(id){
          const res = await axios.put(`${URL}task/updatetask/${id}`, task, {
            headers: { 
              'content-type': 'application/x-www-form-urlencoded',
              'Authorization': token
            }
          });
        }else{
          const res = await axios.post(`${URL}task/create`, taskData, {
            headers: { 
              'content-type': 'application/x-www-form-urlencoded',
              'Authorization': token
            }
          });
        }
        navigate('/list-task')
      }else{
        alert('All fields are required!')
      }
    } catch (error) {
      alert('Some error occured')
    }
  };

  const getTask = async () => {
    try {
      const res = await axios.get(`${URL}task/gettasks/${id}`, {
        headers: { Authorization: token },
      });

      setTask(res.data.tasks[0]);
      // setLoading(false)
    } catch (error) {
      // setLoading(true)
    }
  };
  useEffect(() => {
    if(id){
      getTask();
    }
  }, []);


    // const authStatus = useSelector(store => store.user.online);
    // const localToken = localStorage.getItem('token')
    if(!token){
        return <h1>Please Logged in to post or view your tasks</h1>
    }
  return (
    <form className='sm:w-1/2 items-center text-center justify-center mx-auto mt-5 w-[85%] my-auto' onSubmit={(e)=> handleSubmit(e)}>
        <label className='inline-block mb-1 pl-1' 
            htmlFor='title'>Title :</label>
        <input
            type='text'
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`}
            placeholder='type your title here'
            id='title'
            value={id ? task.title : taskData.title}
            onChange={(e)=> {
              if(id){
                setTask({
                  ...task,
                  title:e.target.value.slice(0,25)
                })
              }else{
                setTaskData({
                  ...taskData,
                  title:e.target.value.slice(0,40)
                })
              }
            }}
            required
            />
            <p>Title length should not be greater than 40 letters</p>
            <label className='inline-block mb-1 mt-5 pl-1' 
            htmlFor='description'>Description :</label>
        <textarea
        rows={8}
            type='text'
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`}
            placeholder='type your description here'
            id='description'
            value={id ? task.description : taskData.description}
            onChange={(e)=> {
              if(id){
                setTask({
                  ...task,
                  description:e.target.value
                })
              }else{
                setTaskData({
                  ...taskData,
                  description:e.target.value
                })
              }
            }}
            required
            />
            <Button type='submit' className='w-full mt-5'>{id ? 'Update' : 'Save'} Task</Button>
    </form>
  )
}

export default Addtask