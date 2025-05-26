import React from 'react';
import "./css/bootstrap.min.css";
import "./css/reset.css";
import "./css/variable.css";
import "./css/common.css"
import "./css/style.css";
import "./css/responsive.css";
import './css/global.css'



import Routes from './routes/Index';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <ToastContainer />
      <Routes />
    </>

  );
}

export default App;
