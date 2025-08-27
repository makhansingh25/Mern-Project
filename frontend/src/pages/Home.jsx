import React from "react";
import banner from "../assets/images/car.jpg";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="main-container">
      <div className="home-container">
        <div className="banner-content">
          <h1>Welcome To Our Company</h1>
          <p>
            🚗 Buy New Cars in India – Find the Perfect Ride for You Looking to
            buy a brand-new car in India? You’re at the right place! Explore the
            latest models from top brands like Maruti Suzuki, Hyundai, Tata,
            Mahindra, Honda, Kia, and more — all in one place.
          </p>
          <div className="home-btn">
            <NavLink to="/contact">
              <button>Contact now</button>
            </NavLink>
            <NavLink to="/newcar">
              <button>Buy Car </button>
            </NavLink>
          </div>
        </div>
        <div className="banner-image">
          <img src={banner} alt="" width="500px" height="500px" />
        </div>
      </div>
    </div>
  );
};

export default Home;
