import React from 'react';
import { Link } from 'react-router-dom';
import isLoggedIn from '../utils/checkToken';


const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      {isLoggedIn() ? (
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-4 text-gray-800">Welcome back!</h1>
          <p className="text-lg text-gray-600 mb-8">Explore your dashboard and manage your profile.</p>
          <Link to="/dashboard" className="btn btn-primary mr-4">Go to Dashboard</Link>
          <Link to="/profile" className="btn btn-secondary">View Profile</Link>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-blue-600">Welcome to EduTrack</h1>
          <p className="text-lg text-gray-800 mb-8">
            EduTrack offers a new perspective on the education process. Join us to enhance your learning journey.
          </p>
          <Link to="/login" className="btn btn-primary mr-4">Login</Link>
          <Link to="/register" className="btn btn-secondary">Register</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
