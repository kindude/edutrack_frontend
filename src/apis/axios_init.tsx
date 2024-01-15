import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import React, { useState, useEffect } from "react";
import { createBrowserRouter, redirect, useNavigate } from 'react-router-dom';
import NavigateTo from '../hooks/navigation';
import CustomError from '../classes/custom_error';
import { createBrowserHistory } from 'history';
import useCustomNav from '../hooks/useCustomNavigate';

const history = createBrowserHistory();
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem("token") || ''}`
  },
});


// export const fetchData = (endpoint: string) => {
//   return axiosInstance.get(endpoint)
//     .then(response => response.data)
//     .catch(error => {
//       console.error("Error fetching data:", error);
//       throw error;
//     });
// };


export default axiosInstance;