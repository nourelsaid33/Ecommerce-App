import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function VerifyCode() {
  const [resetCode, setResetCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function handleVerify(e) {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    console.log("Reset code sent:", resetCode);

    try {
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
        resetCode, // send the value from state
      });

      if (response?.data?.status=== 'Success') {
        console.log('verified')
        navigate(`/resetpassword/${resetCode}`); // navigate to ResetPassword
      }
    } catch (err) {
      setError('Invalid or expired reset code.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleVerify} className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Enter Reset Code</h2>

      <input
        type="text"
        placeholder="Reset Code from email"
        value={resetCode}
        onChange={(e) => setResetCode(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded mb-4"
        required
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Verify'}
      </button>

      {error && <p className="mt-4 text-red-700 bg-red-100 p-2 rounded">{error}</p>}
    </form>
  );
}
