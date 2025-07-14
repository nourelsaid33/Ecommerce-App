import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

export default function Forgetpassword() {
    const [serverMsg, setServerMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

const navigate = useNavigate();

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
       email: ''
       },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      localStorage.setItem('resetEmail', formik.values.email);

      try {
        const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
          email: values.email,
        });

        setServerMsg('Check your email inbox or spam folder.');
        navigate('/VerifyCode')
      } catch (error) {
        setServerMsg(' Email not found or request failed.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
  });

    useEffect(()=>{

    },[])
  return <> <h2>Forgetpassword</h2>
  


 

  

  
    <div className="max-w-md mx-auto mt-16 p-8 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-green-700">Forgot Password</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            please enter your verification code
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder='Email'
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-600 text-sm mt-1">{formik.errors.email}</div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          {isLoading && !serverMsg? <Spinner/> : 'Verify'}
        </button>
      </form>

      {serverMsg && (
        <div className="mt-4 text-center text-sm font-medium text-blue-700 bg-blue-100 p-3 rounded-md">
          {serverMsg}
        </div>
      )}
    </div>
    </>
  
}
