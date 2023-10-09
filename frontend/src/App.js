import { Outlet } from 'react-router-dom';
import './App.css';
import { Header, Login } from './components';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const URL = process.env.REACT_APP_SERVER_URL
  const API_CALL = async()=> {
    //api call to server bcoz it will take some time to served
    try {
      await axios.get(URL)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=> {
    API_CALL()
  }, [])
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  );
}

export default App;
