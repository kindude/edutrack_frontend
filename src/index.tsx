import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
// import { Auth0Provider } from '@auth0/auth0-react';
import { auth_clientId, auth_domain} from './settings';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  // // <Auth0Provider
  //   domain={auth_domain}
  //   clientId={auth_clientId}
  //   authorizationParams={{
  //     redirect_uri: window.location.origin
  //   }}
  // >   
  <React.StrictMode>

    <App/>
    </React.StrictMode>

    // {/* </Auth0Provider>, */}

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
