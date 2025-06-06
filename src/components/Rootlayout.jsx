import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from './Sidebar'

const Rootlayout = () => {
  return (
    <main className='flex gap-4'>
    <Sidebar/>
    <Outlet/>
    </main>
  )
}

export default Rootlayout