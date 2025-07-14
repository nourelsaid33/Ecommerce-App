import React, { use, useEffect, useState } from 'react'
import style from './Layout.module.css'
import Navbar from '../../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
export default function Layout() {
    const [counter , setcounter]= useState(0)

    useEffect(()=>{

    },[])
  return <>

  <Navbar/>

  <div className='container mx-auto max-w-6xl pt-16'>
    <Outlet/>
  </div>

 
  </>
}
