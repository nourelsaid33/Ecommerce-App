import React, { use, useContext, useEffect, useState } from 'react'
import style from './Home.module.css'
import Products from '../Products/Products'
import { CounterContext } from './../../Context/CounterContext'
import RecentProducts from '../RecentProducts/RecentProducts'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'
import { Helmet } from 'react-helmet'
export default function Home() {

  let {counter,user ,setCounter}= useContext(CounterContext)
    //  const [counter , setcounter]= useState(0)

    useEffect(()=>{

    },[])
  return <>
   
           <Helmet>
              <title>Home component</title>
            </Helmet>
  <MainSlider/>
  <CategorySlider/>
  <RecentProducts/>

  
  </>
}
