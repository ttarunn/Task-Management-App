import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./index";


const ViewTask = () => {
  const [task, setTask] = useState({});
  const location = useLocation();
  const id = location.pathname.split(":")[1];
  const URL = process.env.REACT_APP_SERVER_URL;

  const token = localStorage.getItem('token');
  const authStatus = useSelector((store) => store.user.online);

  const navigate = useNavigate();

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

  const handleDelete = async()=> {
    
    try {
        const res = await axios.delete(`${URL}task/deletetask/${id}`, {
            headers: { Authorization: token },
        });
        navigate('/list-task')
                
    } catch (error) {
        alert('Some Error Occured');
    }
  };

  useEffect(() => {
    if(token){
        getTask()
    };
  }, []);

  if(!token){
    return <h1>Please Logged in to post or view your tasks</h1>
}
  return (
    <div className="sm:w-1/2 w-[85%] flex justify-center mb-4 mt-5 relative m-auto rounded-xl p-2 flex-col">
      <div>
      <h1 className="text-center font-bold text-2xl mt-10">{task.title}</h1>
      <p className="text-justify font-extralight text-xl h-[80%] mt-5">{task.description}</p>
      </div>
      <div className="absolute right-6 top-0">
        <Link to={`/edit-task/:${id}`}>
          <Button bgColor="bg-green-500" className="mr-3">
            Edit
          </Button>
        </Link>
        <Button type='button' bgColor="bg-red-500" onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  );
};

export default ViewTask;
