import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { TaskCard } from "./index";


const ListTask = () => {
    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(1)
    
    const token = localStorage.getItem('token');

    const URL = process.env.REACT_APP_SERVER_URL
    
    const getTasks = async ()=> {
        try {
            const res = await axios.get(`${URL}task/gettasks?page=${page}`, {
                headers: { 'Authorization': token }
            } );
            
            setTasks((prev) => [...prev, ...res.data.tasks]);
            
        } catch (error) {
            console.log(error)
        }
        
    };

    const handleScroll = async()=> {
        var totalHeight = document.documentElement.scrollHeight;
        var height = window.innerHeight;
        var scrollTop = document.documentElement.scrollHeight + 1;
        if(height + scrollTop + 1 >= totalHeight){
            
            setPage((prev)=> prev+1)
        }
    }
    useEffect(()=> {
        window.addEventListener('scroll', handleScroll);

        return ()=> window.removeEventListener('scroll', handleScroll);
        
    }, []);

    useEffect(()=> {
        getTasks();
        
    }, [page]);

    if(!token){
        return <h1>Please Logged in to post or view your tasks</h1>
    }
  return (
    <>
    <h1 className='text-center my-9 text-5xl'>All Tasks</h1>
    <div className='w-full flex flex-row justify-center p-5 gap-10 flex-wrap mt-5'>
        {tasks.length > 0 ? tasks?.map(task => <TaskCard key={task._id} id={task._id} title={task.title} description={task.description}/>) : (
            <div className='flex flex-col items-center justify-center h-[88vh]'>
            <h1 className='bg-blue-900 text-white p-4 rounded-lg'>No Task To View</h1>
            <p className='m-2'>Click on Add Task to post a task</p>
        </div>
        )}
    </div>
    </>
  )
}

export default ListTask