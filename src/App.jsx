import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Home from './pages/Home';
import Not_Found from './pages/Not_Found';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Rootlayout from './components/Rootlayout';
import Message from '../src/pages/Message';
const router = createBrowserRouter([
  {
   path:"/",
   Component:Rootlayout,
   children:[
    {index:true,Component:Home},
    {path:'message',Component:Message}
   ]
  },
  {
    path: "/login",
    element: <Signin/>,
  },
  
  {
    path: "*",
    element: <Not_Found/>,
  },
  
  {
    path: "/signup",
    element: <Signup/>,
  },
]);

const App = () => {
  return (
     <RouterProvider router={router} />
  )
}

export default App