import React, { use, useEffect, useState } from 'react'
import style from './CategorySlider.module.css'
import axios from 'axios'
import Slider from 'react-slick'


export default function CategorySlider() {
  var settings = {
    dots: true ,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 2,
    arrows:false,
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
      ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2
        }
      }
    ]
  };
    const [categories , setcategories]= useState(null)


   function getAllCategories(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`).then(({data})=>{
      console.log(data?.data)
      setcategories(data?.data)
    })
    .catch((error)=>{
      console.log(error)
    })
   }


    useEffect(()=>{
      getAllCategories()
    },[])
  return <>
  <div className=' my-10'>
      <Slider {...settings}>
   {categories?.map((category)=>{ return <div>
    <img className='h-[180px] object-cover' src={category?.image} alt={category?.name}/>
    <h3>{category.name}</h3>
   </div> })}
     </Slider>
  </div>
  
  
  </>
}
