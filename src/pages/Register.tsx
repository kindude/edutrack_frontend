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
    <div className="mt-10 container bg-gray-200 d-flex align-items-center justify-content-center h-90 w-50 ml-100">
      <div className="w-50 pb-10">
        <h1>Register</h1>
        <form onSubmit={handleRegister} className='w-80'>
          <div className="mb-3">
            <label htmlFor="first_name" className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              id="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="last_name" className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone_number" className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              id="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <input
                type={formData.showPassword ? 'text' : 'password'}
                className="form-control"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {formData.showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <div className="input-group">
              <input
                type={formData.showPassword ? 'text' : 'password'}
                className="form-control"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {formData.showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
