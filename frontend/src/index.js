import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Login, Signup, ListTask, Addtask, Home, ViewTask } from './components';
import { Provider } from 'react-redux';
import store from './store/store';

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children: [
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/signup',
        element:<Signup/>
      },
      {
        path:'/list-task',
        element:<ListTask/>
      },
      {
        path:'/add-task',
        element:<Addtask/>
      },
      {
        path:'/viewtask/:id',
        element: <ViewTask/>
      },
      {
        path:'/edit-task/:id',
        element: <Addtask/>
      }
    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
