import React, { use, useEffect, useState } from 'react'
import style from './Categories.module.css'
import axios from 'axios';
import Subcategories from '../Subcategories/Subcategories';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function Categories() {
    const [allCategories , setallCategories]= useState(null)
    const [activeCategoryId, setActiveCategoryId] = useState(null);
   var activeCategory= allCategories?.find(category => category._id === activeCategoryId);

    async function getAllCategories(){
      axios.get('https://ecommerce.routemisr.com/api/v1/categories').then(({data})=>{
        console.log(data.data);
        setallCategories(data?.data)
      })
      .catch((error)=>{
        console.log(error)
      })
    }



    useEffect(()=>{
     getAllCategories()
    },[])
  return <>
  <Helmet>
    <title>
      categories component
    </title>
  </Helmet>
  <Link>
 {allCategories?<div className='flex flex-wrap pt-6'>
  {allCategories?.map((category) => (
    
    <div  className='w-full md:w-1/3 p-3'>


      <div className='bg-white  shadow-lg hover:shadow-[0_0_20px_rgba(16,200,139,0.6)] transition-all duration-300 rounded-lg overflow-hidden h-90' onClick={() =>
                setActiveCategoryId(
                  activeCategoryId === category._id ? null : category._id
                )
              }>
        <img src={category.image} alt={category.name} className='w-full h-74 object-cover' />
        <div className='p-4 text-center'>
          <span className='text-green-600 text-2xl font-semibold'>{category.name}</span>
        </div>
      </div>
        
    </div>
  ))}
   {activeCategoryId !==null && (
        <div className="w-full mt-10  pt-6 mb-7">
          <h2 className="text-3xl font-semibold text-green-700 mb-6 text-center">
          {activeCategory?.name}  Subcategories
          </h2>
          <Subcategories id={activeCategoryId}/>
        </div>
      )}
 </div>:<Spinner/>}

  

  </Link> 
  </>
}
 

