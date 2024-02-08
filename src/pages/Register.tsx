import React, { useState } from 'react';
import axiosInstance from '../apis/axios_init';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

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

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-200 p-8 rounded-lg w-96">
        <h1 className="text-center text-3xl font-bold mb-4">Register</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="first_name" className="block text-lg font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="first_name"
              className="input-field"
              value={formData.first_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="last_name" className="block text-lg font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="last_name"
              className="input-field"
              value={formData.last_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone_number" className="block text-lg font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              id="phone_number"
              className="input-field"
              value={formData.phone_number}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="block text-lg font-medium text-gray-700">City</label>
            <input
              type="text"
              id="city"
              className="input-field"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="block text-lg font-medium text-gray-700">Address</label>
            <input
              type="text"
              id="address"
              className="input-field"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              className="input-field"
              value={formData.email}
              onChange={handleInputChange}
            />
            <div id="emailHelp" className="text-xs text-gray-500">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
            <div className="input-group">
              <input
                type={formData.showPassword ? 'text' : 'password'}
                id="password"
                className="input-field"
                value={formData.password}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="btn-toggle"
                onClick={togglePasswordVisibility}
              >
                {formData.showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="block text-lg font-medium text-gray-700">Confirm Password</label>
            <div className="input-group">
              <input
                type={formData.showPassword ? 'text' : 'password'}
                id="confirmPassword"
                className="input-field"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="btn-toggle"
                onClick={togglePasswordVisibility}
              >
                {formData.showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <button type="submit" className="btn-primary text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
