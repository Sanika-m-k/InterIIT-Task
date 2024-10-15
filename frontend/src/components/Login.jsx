import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import baseurl from '../config';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  

 
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${baseurl}/auth/login`, { email, password }, { withCredentials: true });
      const token = response.data.token;
      localStorage.setItem('token',token);
      navigate("/");
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message); 
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${baseurl}/auth/logout`, {}, { withCredentials: true });
      localStorage.removeItem('token'); 
      setMessage('Logged out successfully');
      navigate("/login"); 
    } catch (error) {
      setMessage('Error logging out. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-blue-200 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-semibold text-center mb-6">Login Page</h1>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-800"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button
          onClick={handleLogin}
          className="w-full bg-blue-950 text-white py-2 rounded-lg hover:bg-blue-800 transition duration-200"
        >
          Login
        </button>

        <p className="mt-6 text-center text-gray-600">{message}</p>
      </div>
    </div>
  );
}

export default Login;
