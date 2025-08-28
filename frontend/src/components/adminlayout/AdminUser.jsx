import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/Auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AdminUser = () => {
  const [user, setUser] = useState([]);
  const { token } = useAuth();

  const url = import.meta.env.VITE_API_URL;

  const GetUser = async () => {
    const response = await fetch(`${url}/admin/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      setUser(data.user);
    } 
  };

  const DeleteUser = async (id) => {
    const response = await fetch(`${url}/admin/user/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      GetUser();
      toast(data.message);
    }
  };

  useEffect(() => {
    GetUser();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {user.map((currentUser, index) => (
            <tr key={index}>
              <td>{currentUser.username}</td>
              <td>{currentUser.email}</td>
              <td>{currentUser.phone}</td>
              <td>
                <button>
                  {" "}
                  <Link to={`/admin/updateuser/${currentUser._id}`}>edit</Link>
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    DeleteUser(currentUser._id);
                  }}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUser;
