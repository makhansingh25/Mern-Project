import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/Auth";

const Addcar = () => {
  document.title = "Wheel-mart - AddCar";

  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuth(); // get token from context

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    feature: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("You must be logged in to add a car.");
      navigate("/login");
      return;
    }

    const data = new FormData();

    for (const key in formData) {
      if (formData[key] !== null) {
        if (key === "image") {
          for (let i = 0; i < formData.image.length; i++) {
            data.append("image", formData.image[i]);
          }
        } else {
          data.append(key, formData[key]);
        }
      }
    }

    try {
      setLoader(true);
      const url = import.meta.env.VITE_API_URL;

      const res = await fetch(`${url}/car/addcar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // <-- proper Bearer token header
          // Do NOT set Content-Type here for FormData, browser handles it
        },
        body: data,
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message);
        navigate("/");
      } else {
        toast.error(result.message || "Something went wrong.");
        console.error("Server Error:", result.error);
      }
    } catch (err) {
      toast.error("Network error or server is unavailable.");
      console.error("Fetch Error:", err.message);
    } finally {
      setLoader(false);
    }
  };

  if (loader) {
    return <h1>Loading...</h1>;
  }

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #ece9e6, #ffffff)",
      padding: "20px",
    },
    form: {
      backgroundColor: "#fff",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "500px",
    },
    heading: {
      textAlign: "center",
      marginBottom: "20px",
      color: "#333",
      fontSize: "28px",
    },
    formGroup: {
      marginBottom: "15px",
      display: "flex",
      flexDirection: "column",
    },
    label: {
      marginBottom: "8px",
      fontWeight: "bold",
      color: "#555",
    },
    input: {
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      fontSize: "16px",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#007bff",
      color: "white",
      fontSize: "16px",
      fontWeight: "bold",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "15px",
      transition: "background 0.3s",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
  };

  return (
    <div style={styles.container}>
      <form
        style={styles.form}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h2 style={styles.heading}>Add Car</h2>

        <div style={styles.formGroup}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="1"
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Feature:</label>
          <input
            type="text"
            name="feature"
            value={formData.feature}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            multiple
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor =
              styles.buttonHover.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = styles.button.backgroundColor)
          }
        >
          Add Car
        </button>
      </form>
    </div>
  );
};

export default Addcar;
