import React, { useState } from 'react';
import axiosInstance from '../apis/axios_init';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginWithPopup, isAuthenticated, user } = useAuth0();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    city: '',
    address: '',
    email: '',
    password: '',
    confirmPassword: '',
    passwordError: '',
    showPassword: false
  });

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData(prevState => ({
      ...prevState,
      [id]: value,
      passwordError:
        id === 'password' || id === 'confirmPassword'
          ? id === 'password'
            ? value !== prevState.confirmPassword
              ? "Passwords don't match"
              : !validatePassword(value)
                ? 'Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long'
                : ''
            : prevState.password !== value
              ? "Passwords don't match"
              : !validatePassword(value)
                ? 'Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long'
                : ''
          : prevState.passwordError,
    }));
  };

  const togglePasswordVisibility = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      confirmPassword,
      showPassword,
      passwordError,
      ...formDataCopy
    } = formData;

    const LoginData = {
      email: formData.email,
      password: formData.password
    };

    try {
      const registerResponse = await axiosInstance.post('/auth/register', formDataCopy);
      console.log('Register successful');

      if (registerResponse.status === 201) {
        const loginResponse = await axiosInstance.post('/auth/login', LoginData);
        localStorage.setItem('token', loginResponse.data['token']);
        navigate('/home');
        window.location.reload();
        console.log('Login successful');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    console.log('Form data:', formData);
  };

  const handleLoginWithAuth0 = async () => {
    await loginWithPopup();
    if (isAuthenticated && user) {
      try {
        const response = await axiosInstance.post('/auth/login-auth0', {
          first_name: user.given_name,
          last_name: user.family_name,
          email: user.email
        });

        localStorage.setItem('token', response.data['token']);
        navigate('/');
        window.location.reload();
      } catch (error) {
        console.error('Login failed', error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-200 p-8 rounded-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Register</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="mb-3">
            <label htmlFor="first_name" className="block text-lg font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="first_name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={formData.first_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="last_name" className="block text-lg font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="last_name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={formData.last_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone_number" className="block text-lg font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              id="phone_number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={formData.phone_number}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="block text-lg font-medium text-gray-700">City</label>
            <input
              type="text"
              id="city"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="block text-lg font-medium text-gray-700">Address</label>
            <input
              type="text"
              id="address"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={formData.email}
              onChange={handleInputChange}
            />
            <div id="emailHelp" className="text-xs text-gray-500">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
            <div className="input-group flex justify-center items-center">
              <input
                type={formData.showPassword ? 'text' : 'password'}
                id="password"
                className="mt-1 mr-2 block w-2/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={formData.password}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="btn-toggle bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={togglePasswordVisibility}
              >
                {formData.showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="block text-lg font-medium text-gray-700">Confirm Password</label>
            <div className="input-group flex justify-center items-center">
              <input
                type={formData.showPassword ? 'text' : 'password'}
                id="confirmPassword"
                className="mt-1 mr-2 block w-2/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="btn-toggle bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={togglePasswordVisibility}
              >
                {formData.showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <button type="submit" className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Register
            </button>
            <button type="submit" className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleLoginWithAuth0}>
              Register with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
  
  
  
};

export default RegisterPage;
