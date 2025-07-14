import React, { use, useContext, useEffect, useState } from 'react'
import style from './Checkout.module.css'
import { useFormik } from 'formik';
import { CartContext } from '../../Context/CartContext';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Checkout() {
   let { cardId ,RecetCard} = useContext(CartContext);
    const[isOnline,setisOnline]=useState(true)
   function PayCach(val) {
     console.log(val)

  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cardId}`, {
    shippingAddress: val
  }, {
    headers:{
      token: localStorage.getItem('usertoken')
    }
  })
  .then((res) =>{

  console.log("Order Success:", res)
  if(res.data.status==='success'){
    toast.success('check out done')
    RecetCard()
  }else{
    toast.error('error......')
  }
})
  .catch((err) => console.error("Order error:", err));
}

  function PayOnline(val){
     axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=http://localhost:5181`,{
      shippingAddress:val
    },{
      headers:{
        token:localStorage.getItem('usertoken')
    }
   }).then((response)=>{
    console.log(response);
    if(response.data.status==='success'){
      console.log(response.data.session.url);
      window.location.href=response.data.session.url
      
    }
   }).catch((error)=>{
    console.log(error);
    
   })
  }

  function detectPayment(val){
    if(isOnline){
      PayOnline(val)
    }else{
      PayCach(val)
    }
  }
     let formik=useFormik({
      initialValues:{
       
        details:"",
        phone:"",
        city:"",
       
      },
      onSubmit : detectPayment
    })

    useEffect(()=>{

    },[])
  return <>
  <div className=" flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
  <div className="w-full max-w-md space-y-8">
    <div className="bg-white shadow-md rounded-md p-6">
      <img className="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/499664/user-happy.svg" />
      <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-green-900">
        Checkout Now
      </h2>
      <form onSubmit ={formik.handleSubmit} className="space-y-6" method="POST">
       
        <div>
          <label htmlFor="details" className="block text-sm font-medium text-gray-700">Details</label>
          <div className="mt-1">
            <input  value={formik.values.details} onChange={formik.handleChange} id="details" name="details" type="text" autoComplete="email-address"  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <div className="mt-1">
            <input  value={formik.values.phone}  onChange={formik.handleChange} name="phone" type="tel" autoComplete="password"  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
          </div>


        </div>
         <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">city</label>
          <div className="mt-1">
            <input  value={formik.values.city}  onChange={formik.handleChange} name="city" type="text" autoComplete="password"  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
          </div>


        </div>
       
        
       <div>
         
          <button onClick={()=>{setisOnline(false)}} type="submit" disabled={!cardId} className= {`flex w-full justify-center rounded-md border border-transparent my-3 ${ cardId ? 'bg-green-400 hover:bg-opacity-75' : 'bg-gray-400 cursor-not-allowed'
           } py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2`}
             > Pay Cash
          </button>

          <button onClick={()=>{setisOnline(true)}}  type="submit" disabled={!cardId} className= {`flex w-full justify-center rounded-md border border-transparent ${ cardId ? 'bg-green-400 hover:bg-opacity-75' : 'bg-gray-400 cursor-not-allowed'
           } py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2`}
             > Pay Online
          </button>
        </div>

        
      </form>
    </div>
  </div>
</div>
  </>
}





 