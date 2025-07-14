import React, {  useContext, useEffect, useMemo, useRef, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import Products from '../Products/Products'
import toast from 'react-hot-toast'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Helmet from 'react-helmet'
import Spinner from '../Spinner/Spinner'
export default function Cart() {
 let{numOfCartItems ,totalPrice,products,updateCart,deleteCartItems,clearCart}= useContext(CartContext)
 const navigate = useNavigate();
 const [deletingProductId, setDeletingProductId] = useState(null);
  const [updatingProductId, setUpdatingProductId] = useState(null);


async function handleDelete(prodId) {
  setDeletingProductId(prodId); 
  let response = await deleteCartItems(prodId);
  setDeletingProductId(null);

  if (response?.data?.status === 'success') {
    toast.success('Product deleted');
  } else {
    toast.error('Error deleting product...');
  }
}


 async function handleUpdate(prodId,count){
      setUpdatingProductId(prodId)
     let response=await updateCart(prodId,count)
      setUpdatingProductId(null)
     console.log(response)
      if(response?.data?.status==='success'){
      toast.success('product updated')
     }else{
      toast.error('error...')
     }
    }

     async function handleClear(){
     let response=await clearCart()
     
     console.log(response)
     if(response?.data?.message==='success'){
      toast.success('cart cleared')
      navigate('/')
     }else{
      toast.error('error...')
     }
    }


    useEffect(()=>{
    },[])
  return<>
 
        <Helmet>
           <title>card component</title>
         </Helmet>
  {products? <div className='w-full sm:px-6  mx-auto mt-10  py-10  my-9 rounded-3xl bg-slate-100 text-left rtl:text-right'>

    <div className='flex justify-between items-center mx-10'>
      <div>
         <h2 className='text-3xl  font-semibold py-5'>Cart Shop</h2>
          <h3 className='font-semibold text-lg'>Total Price : <span className='text-green-600 '>{totalPrice}</span> </h3>
      </div> 
      <div>
        <Link to='/Checkout'><button className=' py-2 mb-5 bg-blue-500 rounded-xl px-4  text-white'>checkout</button></Link> 
            <h3 className='font-semibold text-lg'>total number of items: <span className='text-green-600 '>{numOfCartItems}</span> </h3>
      </div>   
    </div>
       <table className="w-full text-sm text-left rtl:text-right  bg-slate-100">
    
      {products?.map((prod)=>{
         return <tbody key={prod?.product?._id}><tr  className="border-b border-gray-300">
          
        <td className="py-6">
          
          <img src={prod?.product?.imageCover} className="w-16 md:w-40 max-w-full h-50 ms-10" alt={prod?.product?.title} />
          </td> 
        <td className=" text-2xl font-semibold text-gray-800 ps-20">
         {prod?.product?.title}
          <div className=" py-1 text-lg text-gray-800 ">
         {prod?.price}EGP
        </div>
         <div >
          
         <a onClick={() => handleDelete(prod.product._id)} className="cursor-pointer text-sm text-red-700 ps-1 flex items-center gap-2">
            {deletingProductId === prod.product._id ? (
                <Spinner/>
                     ) : (
                  <i className="fa fa-trash text-red-700"></i>
                      )}
                         Remove
                   </a>


        </div>
        </td>
        
        <td className="ps-30 py-4">
          <div className="flex items-center">
 
  <button
    onClick={() => {
      setUpdatingProductId(prod.product._id);
      handleUpdate(prod.product._id, prod.count - 1).finally(() => setUpdatingProductId(null));
    }}
    className="inline-flex items-center justify-center p-1 ms-3 text-sm font-medium h-8 w-8 text-gray-500 border border-green-600 rounded-lg"
    type="button"
  >
    {updatingProductId === prod.product._id ? (
      <Spinner />
    ) : (
      <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
      </svg>
    )}
    <span className="sr-only">Decrease quantity</span>
  </button>

 
  <div>
    <input
      type="number"
      readOnly
      value={prod?.count}
      className="w-12 text-sm text-center px-2.5 py-1 placeholder-green-950"
    />
  </div>

  
  <button
    onClick={() => {
      setUpdatingProductId(prod.product._id);
      handleUpdate(prod.product._id, prod.count + 1).finally(() => setUpdatingProductId(null));
    }}
    className="inline-flex items-center justify-center p-1 ms-3 text-sm font-medium h-8 w-8 text-gray-500 border border-green-600 rounded-lg"
    type="button"
  >
    {updatingProductId === prod.product._id ? (
      <Spinner />
    ) : (
      <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
      </svg>
    )}
    <span className="sr-only">Increase quantity</span>
  </button>
</div>

        </td>
       
       
      </tr>
      </tbody>
      })}

 

  </table>
  <div>
   <button onClick={()=>{handleClear()}}  className="cursor-pointer my-10 flex items-center justify-center p-4 mx-auto text-sm font-medium  border border-green-600 rounded-lg" type="button">
        Clear  Your Cart</button>
  </div>

</div>:<div className='container bg-slate-100 rounded-2xl mt-10 py-10 ps-10 text-3xl font-semibold'><h2>Cart shop</h2><h2>Your Cart Is Empty</h2></div>}

 
  </>
}