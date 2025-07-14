import React, { use, useEffect, useState } from 'react'
import style from './Brands.module.css'
import axios from 'axios'
import Spinner from '../Spinner/Spinner'
import { Helmet } from 'react-helmet'
export default function Brands() {
    const [allBrands , setAllBrands]= useState(null)
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [showModal, setShowModal] = useState(false);


    async function getAllbrands(){
      axios.get('https://ecommerce.routemisr.com/api/v1/brands').then(({data})=>{
        console.log(data.data);
        setAllBrands(data?.data)
      })
      .catch((error)=>{
        console.log(error)
      })
    }



    useEffect(()=>{
    getAllbrands()
    },[])
  return <>
  
          <Helmet>
             <title>brand component</title>
           </Helmet>
  
  <div><h2 className="text-4xl font-semibold text-green-700 mb-6 text-center pt-4">
          All Brands
          </h2></div>
 
 {allBrands?<div className='flex flex-wrap py-6'>
  {allBrands?.map((brand) => (  
          
    <div  className='w-full md:w-1/4 p-3' onClick={() => {
    setSelectedBrand(brand);
    setShowModal(true);
  }}>
      
      <div className='bg-white  shadow-lg hover:shadow-[0_0_20px_rgba(16,200,139,0.6)] transition-all duration-500 rounded-lg overflow-hidden '
       >

     
        <img src={brand.image} alt={brand.name} className='w-full  ' />
        <div className='p-4 text-center'>
          <span className=' text-xl '>{brand.name}</span>
        </div>
      </div>
        
   </div>

   
  ))}
  
       
 </div>:<Spinner/>}

  




{showModal && selectedBrand && (
  <div
    className="fixed inset-0 bg-opacity-25 backdrop-blur-sm z-50 flex justify-center items-center"
    onClick={() => setShowModal(false)}
  >
    <div
      className="relative bg-white rounded-lg p-6 w-full max-w-lg shadow-lg"
      onClick={(e) => e.stopPropagation()}
    >
      <div className=' border-b border-gray-200 mt-3'>
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl me-3"
      >
        ✕
      </button>
      </div>
      <img
        src={selectedBrand.image}
        alt={selectedBrand.name}
        className="w-full h-54 object-contain"
      />
      <h3 className="text-xl font-semibold mt-2 text-center text-green-600">{selectedBrand.name}</h3>
       <div class="flex items-center border-t border-gray-200">
                <button  type="button" class="py-2.5 px-5 ms-90 mt-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 "onClick={() => setShowModal(false)}>Close</button>
            </div>
    </div>
  </div>
)}


 

 
  </>
}
 


    


