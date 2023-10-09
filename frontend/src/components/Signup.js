import React, { useState } from 'react'
import { Button, Logo } from "./index"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';



const Signup = () => {
    const [data, setData] = useState({
        name:'',
        email:'',
        password:''
    });

    const navigate = useNavigate();

    const submitHandler = async (user)=> {
        const URL = process.env.REACT_APP_SERVER_URL
        if(user.email && user.password){
            try {
                const res = await axios.post(`${URL}user/signup`, user, {
                    headers: { 'content-type': 'application/x-www-form-urlencoded' }
                });
                navigate('/login');
            } catch (error) {
                alert('Duplicate Email or something error occured')
            }
        }else{
            alert('Please Filled All Required Filled')
        }
    };

  return (
    <div className='sm:w-1/2 items-center text-center justify-center mx-auto mt-5 w-[90%]'>
        
        <h2 className="text-center text-2xl font-bold leading-tight my-5">
          Sign up to create account
        </h2>
        <p className="my-4 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary hover:underline"
          >
            Sign In
          </Link>
          </p>
        <form onSubmit={(e)=> {
            e.preventDefault();
            submitHandler(data)
        }}>
            <div>
            <label className='inline-block mb-1 pl-1' 
                htmlFor='name'>Name :</label>
            <input
                type='text'
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`}
                placeholder='type your name'
                id='name'
                value={data.name}
                onChange={(e) => setData({
                    ...data,
                    name:e.target.value
                }) }
                required
                />
            </div>
            <div>
            <label className='inline-block mb-1 pl-1' 
                htmlFor='email'>Email :</label>
            <input
                type='email'
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`}
                placeholder='type your email'
                id='email'
                value={data.email}
                onChange={(e) => setData({
                    ...data,
                    email:e.target.value
                }) }
                required
                />
            </div>
            <div>
                <label className='inline-block mb-1 pl-1' 
                htmlFor='password'>Password :</label>
            <input
                type='password'
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`}
                placeholder='type your password'
                id='password'
                value={data.password}
                onChange={(e) => setData({
                    ...data,
                    password:e.target.value
                }) }
                required
                />
            </div>
            <Button type='submit' className='w-full mt-5'>Signup</Button>
        </form>
    </div>
  )
}

export default Signup