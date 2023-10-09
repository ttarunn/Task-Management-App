import React, { useState } from 'react'
import { Button, Logo } from "./index"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, addToken } from '../store/userSlice';


const Login = () => {
    const [data, setData] = useState({
        email:'',
        password:''
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginHandler = async (user)=> {
        const URL = process.env.REACT_APP_SERVER_URL
        if(user.email && user.password){
            try {
                const res = await axios.post(`${URL}user/login`, user, {
                    headers: { 'content-type': 'application/x-www-form-urlencoded' }
                });
                 
                dispatch(login(res.data));
                dispatch(addToken(res.data.token))
                localStorage.setItem('token', res.data.token)
                navigate('/')
            } catch (error) {
                alert('Email or Password Incorrect')
            }
        }else{
            return alert('Please Filled All Required Filled')
        }
    };

  return (
    <div className='w-1/2 items-center text-center justify-center mx-auto mt-5'>
        <h2 className="text-center text-2xl font-bold leading-tight my-5">
          Sign In to your account
        </h2>
        <p className="my-4 text-center text-base text-black/60">
        Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary hover:underline"
          >
            Sign Up
          </Link>
          </p>
    <form onSubmit={(e)=> {
        e.preventDefault();
        loginHandler(data)
    }}>
        <div>
        <label className='inline-block mb-1 pl-1' 
            htmlFor='password'>Email :</label>
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
            placeholder='type your email'
            id='password'
            value={data.password}
            onChange={(e) => setData({
                ...data,
                password:e.target.value
            }) }
            required
            />
        </div>
        <Button type='submit' className='w-full mt-5'>Login</Button>
    </form>
    </div>
  )
}

export default Login