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
        
        if (response && response.data) {
          setRole(response.data.role);
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
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlinkHref="#bootstrap" /></svg>
          </a>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><Link to="/" className="nav-link px-2 text-secondary">Home</Link></li>
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
              <button className="btn btn-danger" onClick={handleLogoutHeader}>
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

          {Role() == 'ADMIN' && (
            <div className="ml-3">
              <Link className="btn btn-outline-light me-2" to="/admin">
                Admin Panel
              </Link>
            </div>
          )}

          {Role() == 'TEACHER' && (
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

