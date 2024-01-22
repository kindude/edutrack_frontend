import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

export class TokenRefreshError extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = 'TokenRefreshError';
  }
}

let isRefreshing = false;
let refreshSubscribers: any[] = [];

function onRefreshed(token: null) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

function addRefreshSubscriber(callback: (token: any) => void) {
  refreshSubscribers.push(callback);
}

interface OriginalRequest extends AxiosRequestConfig {
  headers?: any;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem("token") || ''}`
  },
});

export function setupInterceptors() {
  const interceptor = axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest: OriginalRequest = error.config || {};

      if (error.response && error.response.status === 401) {
        if (!isRefreshing) {
          isRefreshing = true;

          try {
            const refreshedToken = await axiosInstance.post('/auth/refresh');
            localStorage.setItem('token', refreshedToken.data.token);
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers['Authorization'] = `Bearer ${refreshedToken.data.token}`;

            const retryOriginalRequest = await axiosInstance(originalRequest);

            onRefreshed(refreshedToken.data.token);
            window.location.reload();
            return retryOriginalRequest;
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);

            localStorage.removeItem('token');
            localStorage.removeItem('id');
            localStorage.removeItem('role');
            onRefreshed(null);

            throw new TokenRefreshError('Token refresh failed');
          } finally {
            isRefreshing = false;
          }
        } else {
          // Throw a TokenRefreshError to ensure catch blocks work
          throw new TokenRefreshError('Error during token refresh retry');
        }
      }

      // If the error is not a 401, just reject it
      return Promise.reject(error);
    }
  );

  return interceptor;
}

// Call setupInterceptors() when axiosInstance is being used
setupInterceptors();

export default axiosInstance;
