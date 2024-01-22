import React, { useEffect, useState } from 'react';
import axiosInstance from '../apis/axios_init';
import { useParams } from 'react-router-dom'; // Ensure you have this import
import isAdmin from '../utils/isAdmin';

const UpdateProfile: React.FC = () => {
  const [error, setError] = useState<string>('');
  const [userInfo, setUserInfo] = useState<any>({});
  const [formData, setFormData] = useState({
    id: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    city: '',
    address: '',
    email: '',
    password: '',
    confirmPassword: '',
    passwordError: '',
    showPassword: false,
    role: '',
  });
  const isAdminFlag = isAdmin(); // Replace with your actual isAdmin function
  const { userId } = useParams(); // Ensure you have 'useParams' imported from 'react-router-dom'

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axiosInstance.get(`/users/${userId}`);
        setFormData(response.data);
      } catch (error) {
        setError('Something went wrong, please try again');
      }
    };
    fetchUserDetails();
  }, [userId]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { confirmPassword, showPassword, passwordError, ...formDataCopy } = formData;
      await axiosInstance.put(`/users/`, formDataCopy);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
      passwordError:
        (id === 'password' || id === 'confirmPassword') &&
        (id === 'password' ? value !== prevFormData.confirmPassword : prevFormData.password !== value)
          ? "Passwords don't match"
          : !validatePassword(value)
          ? 'Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long'
          : '',
    }));
  };

  const togglePasswordVisibility = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      showPassword: !prevFormData.showPassword,
    }));
  };

  return (
    <div>
      <form onSubmit={handleUpdate} className="w-80">
        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone_number" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
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
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
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

        {isAdminFlag ==='ADMIN' && (
          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <input
              type="text"
              className="form-control"
              id="role"
              value={formData.role}
              onChange={handleInputChange}
            />
          </div>
        )}

        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
