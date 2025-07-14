import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const email = localStorage.getItem('resetEmail'); 
   let navigate=useNavigate()
  async function handleReset(e) {
    e.preventDefault();
    try {
      const res = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
        email,
        newPassword: password,
      });

      if (res.data.token) {
        setMsg('✅ Password changed successfully!');
        localStorage.removeItem('resetEmail'); 
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    } catch (err) {
      setMsg('❌ Could not reset password.');
    }
  }

  return (
    <form onSubmit={handleReset} className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Reset Your Password</h2>

      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded mb-4"
        required
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Reset Password
      </button>

      {msg && <p className="mt-4 text-center text-green-700">{msg}</p>}
    </form>
  );
}
