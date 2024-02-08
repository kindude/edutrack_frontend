import { Link, useNavigate } from "react-router-dom";
import isLoggedIn from "../../utils/checkToken";
import React, { useState, useEffect } from 'react';
import axiosInstance from "../../apis/axios_init";
import Role from "../../utils/isAdmin";
import first_name from "../../utils/get_first_name";

const Header: React.FC = () => {
  const [role, setRole] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('users/me');

        if (response && response.data) {
          setRole(response.data.role);
          localStorage.setItem('first_name', JSON.stringify(response.data.first_name))
          localStorage.setItem('role', JSON.stringify(response.data.role));
          localStorage.setItem('id', JSON.stringify(response.data.id));
        }
      } catch (error: any) {

      }
    };

    fetchData();
  }, [navigate]);


  const handleLogoutHeader = async () => {
    try {
      const response = await axiosInstance.post('/auth/logout', null, {
        withCredentials: true,
      });
      if (response.status == 200) {
        localStorage.removeItem('id');
        localStorage.removeItem('role');
        localStorage.removeItem('token');

        document.cookie = 'refresh_token' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        axiosInstance.defaults.headers['Authorization'] = `Bearer `;
        navigate('/');
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
    navigate('/');

  };

  return (
    <header className="p-3 bg-dark text-white">
      <div className="container flex justify-between items-center">
        <div className="flex items-center">
          <h1>
            <Link to="/" className="text-decoration-none text-white transition-colors duration-300 hover:text-yellow-300">EduTrack</Link>
          </h1>
        </div>
        <div className="flex items-center">
          {isLoggedIn() ? (
            <>
              <Link className="btn btn-outline-light ml-2" to="/profile">Profile</Link>
              <button className="btn btn-danger ml-2" onClick={handleLogoutHeader}>Logout</button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-light ml-2" to="/login">Login</Link>
              <Link className="btn btn-warning ml-2" to="/register">Sign-up</Link>
            </>
          )}
          {Role() == 'ADMIN' && (
            <div className="ml-3">
              <Link className="btn btn-outline-light me-2" to="/admin">Admin Panel</Link>
            </div>
          )}
          {Role() == 'TEACHER' && (
            <div className="ml-3">
              <Link className="btn btn-outline-light me-2" to="/teacher">Teacher Panel</Link>
            </div>
          )}
          {isLoggedIn() && (
            <div className="ml-3 flex items-center">
              <p className="text-white text-2xl font-semibold pt-2">Welcome, {first_name()}</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
