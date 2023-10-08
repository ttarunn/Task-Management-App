import { Outlet } from 'react-router-dom';
import './App.css';
import { Header, Login } from './components';

function App() {
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  );
}

export default App;
