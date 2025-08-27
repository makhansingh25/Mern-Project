import React from "react";
import { NavLink } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="pagenotfound">
      <div className="inner-con">
        <h1>!</h1>
        <h1>404</h1>
        <h2>Page Not Found!</h2>
        <p>Opps! this page does not exist</p>
        <div>
          <NavLink to="/">
            <button>Go to Home</button>
          </NavLink>
          <NavLink to="/contact">
            <button>Report Problem</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
