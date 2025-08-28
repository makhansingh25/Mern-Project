import { useEffect, useState } from "react";
import { useAuth } from "../../store/Auth";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateUser = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { id } = useParams();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const InputHandler = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const GetSingleUser = async () => {
    if (!token) {
      toast.error("Unauthorized access!");
      return;
    }

    try {
      const url = import.meta.env.VITE_API_URL;

      const response = await fetch(`${url}/admin/getuser/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
      } else {
        toast.error(data.message || "Failed to fetch user data.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching user data.");
    }
  };

  useEffect(() => {
    GetSingleUser();
  }, [id]);

  const UpdateAdminUser = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Unauthorized access!");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/admin/updates/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "User updateddddddd successfully!");
        navigate("/admin/users");
      } else {
        toast.error(data.message || "Failed to update user.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the user.");
    }
  };

  return (
    <div className="main-container">
      <div className="registration-container">
        <div className="form-container">
          <h1>Edit User</h1>
          <form onSubmit={UpdateAdminUser}>
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter name"
              value={user.username}
              onChange={InputHandler}
              required
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={user.email}
              onChange={InputHandler}
              required
            />
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter phone"
              value={user.phone}
              onChange={InputHandler}
              required
            />
            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
