// import React from 'react'
// import Sidebar from '../components/Sidebar'

import { useDispatch, useSelector } from 'react-redux'
import Userlist from '../components/Userlist'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { userLoginInfo } from '../sliece/userSlice';



const Home = () => {
 const navigate=useNavigate()
  const data=useSelector((state)=>state.userLogin.value)
  const auth=getAuth()
  const dispatch=useDispatch()
  // console.log(auth);
  
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      
      if (user) {
        dispatch(userLoginInfo(
          {
            name:user.displayName,
            email:user.email,
            uid:user.uid
          }
        ))
      } else {
       dispatch(userLoginInfo(null))
      }
    });
  },[dispatch])
  // useEffect(()=>{
  //   if(!data){
  //    navigate('/login')
  //   }
  // },[])
  // console.log(data)
  return (
    <div className='grid grid-cols-3   w-full h-[1000px]'>
   {/* <h1>{data.displayName}</h1> */}
  {/* <Userlist/>
  <Userlist/>
  <Userlist/>
  <Userlist/>
  <Userlist/>
  <Userlist/> */}
  
</div>

  )
}

export default Home