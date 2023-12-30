import React from 'react';
import logo from '../logo.svg' 
import '../styles/App.css';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import LoginPage from './Login';
import RegisterPage from './Register';
import Navbar from '../components/Navbar/Navbar';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Profile from './Profile';



function App() {
  return (
    <div className="wrapper">
      <Router>
        <Header />
        <div className='content'>
        <Navbar />
        <div className='pl-10 pt-10'>
        <Routes>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        </div>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
