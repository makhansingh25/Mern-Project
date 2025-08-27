import { useState } from "react";
import banner from "../assets/images/car.jpg";
import { useAuth } from "../store/Auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [user, setData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const { storeToken } = useAuth();
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${url}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const resData = await response.json();

      if (response.ok) {
        storeToken(resData.token);
        toast.success("Registration successful!");
        navigate("/");
      } else {
        // Show backend error message on failure
        toast.error(resData.message || "Registration failed");
        // Optionally stay on the page or navigate to login
        // navigate("/login");
      }
    } catch (error) {
      // Handle network errors or unexpected issues
      toast.error("Something went wrong. Please try again.");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="main-container">
      <div className="registration-container">
        <div className="image">
          <img src={banner} alt="banner" width="500px" height="400px" />
        </div>
        <div className="form-container">
          <h1>Registration Form</h1>
          <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter name"
              value={user.username}
              onChange={inputHandler}
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={user.email}
              onChange={inputHandler}
              required
            />

            <label>Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter phone"
              value={user.phone}
              onChange={inputHandler}
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={user.password}
              onChange={inputHandler}
              required
              autoComplete="new-password" // ✅ For new account creation
            />

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
