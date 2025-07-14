import React, { use, useEffect, useState } from 'react'
import style from './MainSlider.module.css'
import img1 from '../../assets/images/img1.jpg'
import img2 from '../../assets/images/img2.jpg'
import img3 from '../../assets/images/img3.jpg'
import img4 from '../../assets/images/img4.jpg'
import img5 from '../../assets/images/img5.jpg'
import Slider from 'react-slick'
export default function MainSlider() {
  

 const settings = {
  dots: true,
  infinite: false, // Optional: makes it stop instead of looping
  speed: 500,
  slidesToShow: 1,   // Show 2 slides per "page"
  slidesToScroll: 1, // Scroll 2 slides at a time
  arrows: false,
  appendDots: dots => (
    <div>
      <ul className="flex justify-center mt-4">{dots}</ul>
    </div>
  ),
  customPaging: i => (
    <div
      style={{
        width: '14px',
        height: '10px',
        borderRadius: '20%',
        backgroundColor: '#ccc',
      }}
    ></div>
  )
};
    const [counter , setcounter]= useState(0)

    useEffect(()=>{

    },[])
  return <>
  
  <div className='pt-6 flex flex-wrap w-120 m-auto'>
    <div className='w-1/2 '>
        <Slider  {...settings}>
         <img src={img1} className='w-full'/>
          <img src={img2} className='w-full'/>
          <img src={img5} className='w-full'/>
         </Slider>
    </div>
    <div className='w-1/2  '>
      <img src={img3}/>
      <img src={img4}/>

    </div>
  </div>
  
  </>
  
}
