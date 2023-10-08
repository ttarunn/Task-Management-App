import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const ListTask = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const authStatus = useSelector(store => store.user.online)
    const URL = process.env.REACT_APP_SERVER_URL
    const getTasks = async ()=> {
        try {
            const tasks = await axios.get(`${URL}/gettasks`);
            setTasks(tasks.data.tasks);
            setLoading(false)
        } catch (error) {
            setLoading(true)
        }
        
    }
    useEffect(()=> {
        getTasks()
    }, []);
    if(!authStatus){
        return <h1>Please Logged in to post or view your tasks</h1>
    }
  return (
    <div>{tasks && tasks.map(task => <h1>{task}</h1>)}</div>
  )
}

export default ListTask