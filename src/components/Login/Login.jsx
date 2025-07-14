import React, { use, useContext, useEffect, useState } from 'react'
import style from './Login.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'
import Spinner from '../Spinner/Spinner'
export default function Register() {
 let{setuserLogin}= useContext(UserContext)
 let { numOfCartItems,setnumOfCartItems} =useContext(CartContext)
    const [errMsg , seterrMsg]= useState(null)
    const[isLoading , setisLoading]=useState(false)
    
let navigate=useNavigate()

 function UserCartItems(token) {
  
     axios.get(
      'https://ecommerce.routemisr.com/api/v1/cart',
      {
        headers: {
          token,
        },
      }).then(({data})=>{
        console.log(data)
         setnumOfCartItems(data.numOfCartItems || 0); 
      }).catch ((err)=>{
    console.error('Error fetching cart:', err);
    setnumOfCartItems(0);
        })
}

 async function submitForm(val){
 setisLoading(true)

  axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, val).then(({data})=>{
    console.log(data.token)
       setisLoading(false)

    console.log(data)
    if(data.message ==='success'){
       setuserLogin(data?.token)
      navigate('/')
    localStorage.setItem('usertoken', data?.token)
    UserCartItems(data.token)
    }
  }) .catch((errors)=>{
     setisLoading(false)

    //  console.log(errors?.response?.data?.message)
     seterrMsg(errors?.response?.data?.message)
  })
}   

let validationSchema=Yup.object().shape({
  email:Yup.string().required('email is req').email('invail email'),
  password:Yup.string().required('password is required').matches(/^[1-9]{6}$/, 'invalid password'),
 
})
 let formik=useFormik({
  initialValues:{
   
    email:"",
    password:"",
   
  },
  validationSchema:validationSchema,
  onSubmit:submitForm
})
    useEffect(()=>{

    },[])
    // console.log(formik)
  return<>
 <div className=" flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
  <div className="w-full max-w-md space-y-8">
    <div className="bg-white shadow-md rounded-md p-6">
      <img className="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/499664/user-happy.svg" />
      <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-green-900">
        Login Now
      </h2>
     <form onSubmit={formik.handleSubmit} className="space-y-6" method="POST">
  {/* Email Field */}
  <div>
    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
    <div className="mt-1">
      <input
        id="email"
        name="email"
        type="email"
        value={formik.values.email}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        autoComplete="email"
        className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
      />
    </div>
    {formik.touched.email && formik.errors.email ?<div className="bg-red-200 rounded-md mt-2 p-2 text-sm text-red-800">
        {formik.errors.email}
      </div>:null}
  </div>

  {/* Password Field */}
  <div>
    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
    <div className="mt-1">
      <input
        id="password"
        name="password"
        type="password"
        value={formik.values.password}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        autoComplete="current-password"
        className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
      />
    </div>
    {formik.touched.password && formik.errors.password ?<div className="bg-red-200 rounded-md mt-2 p-2 text-sm text-red-800">
        {formik.errors.password}
      </div>:null}
  
  </div>

  {/* Submit Button */}
  <div>
    <button
      type="submit"
      className="flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
    >
      {isLoading ? <Spinner/> : 'Login Account'}
    </button>
  </div>
  <Link to={'/forgetpassword'}><a className='hover:text-green-600'>Forget Password?</a></Link>

  {/* Server Error Message */}
  {errMsg ? <div className="bg-red-200 px-6 py-3 rounded-2xl text-sm flex items-center mx-auto max-w-lg mt-3">
      <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 mr-3">
        <path
          fill="currentColor"
          d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207A11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
        />
      </svg>
      <span className="text-red-800">{errMsg}</span>
    </div>:null}
  
</form>

    </div>
  </div>
</div>

  </>
}

