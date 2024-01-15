import React, { useState } from 'react';
import axiosInstance from '../apis/axios_init';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string>('');
  const { loginWithRedirect } = useAuth0();
  const { loginWithPopup } = useAuth0();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

      const response = await axiosInstance.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data['token']);
      navigate('/');
      window.location.reload();

    } catch (error) {
      console.error('Login failed', error);
      setLoginError('Login failed. Please check your credentials.');
    }
  };


  return (
    <div className="mt-40 container bg-gray-200 d-flex align-items-center justify-content-center h-3/5 w-50 ml-100">
      <div className="w-50 text-center">
        <h1>Login</h1>
        {loginError && <p className="text-danger">{loginError}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              value={email}
              onChange={handleEmailChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
          <button className="btn btn-primary w-100 mt-2" onClick={() => loginWithPopup()}>
            Log In with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
