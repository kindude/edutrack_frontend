import React from 'react';

const RegisterPage: React.FC = () => {
  const handleRegister = () => {
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="fullName" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
