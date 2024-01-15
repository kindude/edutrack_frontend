import { Link, useNavigate } from "react-router-dom";
import isLoggedIn from "../../utils/checkToken";
import isAdmin from "../../utils/isAdmin";
import React, { useState, useEffect } from 'react';
import axiosInstance from "../../apis/axios_init";
import { createBrowserHistory } from "history";
import CustomError from "../../classes/custom_error";
import Role from "../../utils/isAdmin";
import { auth_clientId } from "../../settings";

const Header: React.FC = () => {
  const [role, setRole] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('users/me');
        setRole(response.data.role);
        localStorage.setItem('role', JSON.stringify(response.data.role));
        localStorage.setItem('id', JSON.stringify(response.data.id));

      } catch (error) {

      }
    };

    fetchData();
  }, [navigate]);


  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post('/auth/logout', null, {
        withCredentials: true,
      });
      if (response.status == 200) {
        localStorage.clear();
        document.cookie = 'refreshToken' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        navigate('/');
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };


  let isRefreshing = false;
let isRedirected = false; 

const interceptor = axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if ((error.response && error.response.status === 401 || error.response.status === 403) && !isRefreshing) {
      isRefreshing = true;
      let isError = 0;

      try {
        const tokenResponse = await axiosInstance.post('/auth/refresh');

        if (tokenResponse.status === 401) {
          throw new Error('Unauthorized');
        } else {
          const token = tokenResponse.data['token'];
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          originalRequest.headers.Authorization = `Bearer ${token}`;
          isRefreshing = false;
          localStorage.setItem('token', tokenResponse.data['token']);
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        localStorage.clear();
        isRefreshing = false;
        isError += 1 ;
      }

      if (isError === 1 && !isRedirected) {
        // navigate('/login');
        isRedirected = true; 
      }
    }

    return Promise.reject(error);
  }
);


  return (
    <header className="p-3 bg-dark text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlinkHref="#bootstrap" /></svg>
          </a>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><a href="#" className="nav-link px-2 text-secondary">Home</a></li>
            <li><a href="#" className="nav-link px-2 text-white">Features</a></li>
            <li><a href="#" className="nav-link px-2 text-white">Pricing</a></li>
            <li><a href="#" className="nav-link px-2 text-white">FAQs</a></li>
            <li><a href="#" className="nav-link px-2 text-white">About</a></li>
          </ul>
          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search" />
          </form>
          {isLoggedIn() ? (
            <div>
              <Link className="btn btn-outline-light me-2" to="/profile">
                Profile
              </Link>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link className="btn btn-outline-light me-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-warning" to="/register">
                Sign-up
              </Link>
            </div>
          )}

          {Role() == 'ADMIN' &&(
            <div className="ml-3">
              <Link className="btn btn-outline-light me-2" to="/admin">
                Admin Panel
              </Link>
            </div>
          )}
          
          {Role() == 'TEACHER' &&(
            <div className="ml-3">
              <Link className="btn btn-outline-light me-2" to="/teacher">
                Teacher Panel
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;

