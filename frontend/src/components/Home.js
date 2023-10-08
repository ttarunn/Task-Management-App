import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {

    const authStatus = useSelector((store)=> store.user.online);
    const userData = useSelector((store)=> store.user.userData);
    console.log(userData, authStatus)


    return authStatus ? (
        <div className='flex flex-col items-center justify-center h-[88vh]'>
            Hello 
        </div>
    ):(<div>logout</div>)
}

export default Home