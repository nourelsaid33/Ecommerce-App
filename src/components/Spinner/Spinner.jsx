import React, { use, useEffect, useState } from 'react'
import style from './Spinner.module.css'
export default function Spinner() {
    const [counter , setcounter]= useState(0)

    useEffect(()=>{

    },[])
  return <>
  
<div className="fixed inset-0 bg-neutral-950 opacity-45  flex items-center justify-center z-50">
      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>

  </>
}
