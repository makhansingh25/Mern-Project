import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { MdContactPhone } from "react-icons/md";

const AdminPage = () => {
  return (
    <div className="admin-container">
      <h1>Welcome to the Admin Page</h1>
      <nav className="admin-nav">
        <ul>
          <li>
            <NavLink to="/admin/users">
              <FaUserAlt />
              User
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/contact">
              <MdContactPhone />
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default AdminPage;
