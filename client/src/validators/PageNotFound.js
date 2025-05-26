import React from "react";
import LoginForm from "../components/Login";


const PageNotFound = () => {
  return (
    <>
    
      <div className="page-not-found">
        <div className="thanku-page-main">
          
          <h2 className="heading-h2 thanku-title">
            <span>Sorry, the page you're looking for cannot be found.</span>
          </h2>
          <h5 className="heading-h5 thanku-subtitle">
            You need to be logged in to access other pages.
          </h5>
          <div className="cta">
            <button
              redirectTo="/login"
              label="Go to Login"
              custClassName="cost-btn t-btn"
            />
          </div>
        </div>
      </div>
      <LoginForm/>
    </>
  );
};

export default PageNotFound;
