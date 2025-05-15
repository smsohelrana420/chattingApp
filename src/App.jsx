import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Home from './pages/Home';
import Not_Found from './pages/Not_Found';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  
  {
    path: "*",
    element: <Not_Found/>,
  },
  {
    path: "/login",
    element: <Signin/>,
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