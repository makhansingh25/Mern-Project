import { useState } from "react";
import banner from "../assets/images/car.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/Auth";
import { toast } from "react-toastify";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { storeToken } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${url}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const resData = await response.json();

      if (response.ok) {
        storeToken(resData.token);
        toast.success(resData.message || "Login successful!");
        navigate("/");
      } else {
        toast.error(
          resData.message || "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      toast.error("Network error. Please try again later.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <div className="login-container">
        <div className="image">
          <img src={banner} alt="Car banner" width="500px" height="400px" />
        </div>
        <div className="form-container">
          <h1>Login Form</h1>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={user.email}
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

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
