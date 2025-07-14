import React, { use, useContext, useEffect, useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import Spinner from '../Spinner/Spinner'

export default function Register() {
  let {setuserLogin} =useContext(UserContext)
    const [errMsg , seterrMsg]= useState(null)
    const[isLoading , setisLoading]=useState(false)
  let navigate=useNavigate()
 
 async function submitForm(val){
 setisLoading(true)
 
  axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', val).then(({data})=>{
   setisLoading(false)
    console.log(data.token);

    if(data.message ==='success'){
       navigate('/') 
       localStorage.setItem('usertoken', data?.token)
             
       setuserLogin(data?.token)
     
    }
  })
  .catch((errors)=>{
       setisLoading(false)

     console.log(errors?.response?.data?.message)
     seterrMsg(errors?.response?.data?.message)
  })
    
  }

let validationSchema=Yup.object().shape({
  name:Yup.string().required('name is req').min(3, 'min 3 letters').max(6,'max 6 letters'),
  email:Yup.string().required('email is req').email('invail email'),
  password:Yup.string().required('password is required').matches(/^[1-9]{6}$/, 'invalid password'),
  rePassword:Yup.string().required('repassword is req').oneOf([Yup.ref('password')], 'invalid repassword'),
  phone:Yup.string().required('phone is req').matches(/^01[0125][0-9]{8}$/  ,'invalid phone' ),
})
 let formik=useFormik({
  initialValues:{
    name:"",
    email:"",
    password:"",
    rePassword:"",
    phone:""
  },
  validationSchema:validationSchema,
  onSubmit:submitForm
})
    useEffect(()=>{

    },[])
  return<>
 <div className="flex h-screen items-center justify-center  sm:px-6 lg:px-8 ">
  <div className="w-full max-w-md space-y-8 ">
    <div className="bg-gray-50 shadow-md rounded-md p-6 mt-60 mb-20">
      <img className="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/499664/user-happy.svg" />
      <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-green-900">
        Register Now
      </h2>
      <form onSubmit ={formik.handleSubmit} className="space-y-6" method="POST">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Username</label>
          <div className="mt-1">
            <input value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} id='name' name="name" type="text" className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
          </div>
          {/* alert */}
          {formik.errors.name && formik.touched.name ?
          <div className="bg-red-200 px-6  rounded-md text-lg flex items-center mx-auto max-w-lg">
    <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
    <path fill="currentColor" d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
    </path>
  </svg>
  <span className="text-red-800">{formik.errors.name} </span>
</div> :null}
          

          {/* alert */}
          {/* <div className='bg-red-200'>{formik.errors.name}</div> */}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <div className="mt-1">
            <input  value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} id="email" name="email" type="email-address" autoComplete="email-address"  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
          </div>
             {/* alert */}
          {formik.errors.email && formik.touched.email?  <div className="bg-red-200 px-6   rounded-md text-lg flex items-center mx-auto max-w-lg">
  <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
    <path fill="currentColor" d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
    </path>
  </svg>
  <span className="text-red-800">{formik.errors.email} </span>
</div> :null}
         

          {/* alert */}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <div className="mt-1">
            <input  value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} name="password" type="password" autoComplete="password"  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
          </div>
           {/* alert */}
          {formik.errors.password && formik.touched.password?  <div className="bg-red-200 px-6 rounded-md text-lg flex items-center mx-auto max-w-lg">
  <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
    <path fill="currentColor" d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
    </path>
  </svg>
  <span className="text-red-800">{formik.errors.password} </span>
</div>: null}
        

          {/* alert */}
        </div>
        <div>
          <label htmlFor="rePassword" className="block text-sm font-medium text-gray-700"> rePassword</label>
          <div className="mt-1">
            <input  value={formik.values.rePassword} onBlur={formik.handleBlur} onChange={formik.handleChange} id='rePassword' name="rePassword" type="password" autoComplete="confirm-password"  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
          </div>
           {/* alert */}
          {formik.errors.rePassword && formik.touched.rePassword?  <div className="bg-red-200 px-6  rounded-md text-lg flex items-center mx-auto max-w-lg">
  <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
    <path fill="currentColor" d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
    </path>
  </svg>
  <span className="text-red-800">{formik.errors.rePassword} </span>
</div>:null}
         

          {/* alert */}
        </div>
         <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700"> phone</label>
          <div className="mt-1">
            <input  value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} id='phone' name="phone" type="tel" autoComplete="confirm-password"  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
          </div>
           {/* alert */}
          {formik.errors.phone && formik.touched.phone?<div className="bg-red-200 px-6   rounded-md text-lg flex items-center mx-auto max-w-lg">
  <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
    <path fill="currentColor" d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
    </path>
  </svg>
  <span className="text-red-800">{formik.errors.phone} </span>
</div>:null}
          

          {/* alert */}
        </div>
        <div>
          <button type="submit" className="flex w-full justify-center rounded-md border border-transparent bg-green-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2">{isLoading ? <Spinner/>: 'RegisterAccount' }
            
          </button>
        </div>
           {/* error alert */}
           {errMsg?<div className="bg-red-200 px-6  rounded-md text-lg flex items-center mx-auto max-w-lg">
    <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
    <path fill="currentColor" d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
    </path>
  </svg>
  <span className="text-red-800">{errMsg} </span>
</div> :null }
         
      </form>
    </div>
  </div>
</div>

  </>
}
