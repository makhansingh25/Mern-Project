import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../store/Auth";
import { BiLogoMediumSquare } from "react-icons/bi";

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  return (
    <div className="main-container">
      <div className="container">
        <NavLink to="/" className="logo">
          WheelMart
        </NavLink>

        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/newcar">New Car</NavLink>
            </li>
            <li>
              <NavLink to="/addcar">Add car</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/service">Services</NavLink>
            </li>

            {isLoggedIn ? (
              <li>
                <NavLink to="/logout">logout</NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/register">Sign-in</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Login-in</NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
        <Outlet />
      </div>
    </div>
  );
};

export default Navbar;
