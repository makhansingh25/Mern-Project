import { useEffect, useState } from "react";
import banner from "../assets/images/contact.jpg";
import { useAuth } from "../store/Auth";

const Contact = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    message: "",
  });

  const { users } = useAuth();

  // ✅ Pre-fill user data once
  useEffect(() => {
    if (users) {
      setData((prevData) => ({
        ...prevData,
        username: users.username || "",
        email: users.email || "",
      }));
    }
  }, [users]);

  const InputHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const InputSubmit = async (e) => {
    e.preventDefault();
    const url = import.meta.env.VITE_API_URL;

    const response = await fetch(`${url}/contact/form/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Message submitted successfully");
      setData({
        username: users?.username || "",
        email: users?.email || "",
        message: "",
      });
    }
  };

  return (
    <>
      <div className="main-container">
        <div className="contact-container">
          <div className="image">
            <img
              src={banner}
              alt="Contact Banner"
              width="500px"
              height="400px"
            />
          </div>
          <div className="form-container">
            <h1>Contact Form</h1>
            <form onSubmit={InputSubmit}>
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter name"
                value={data.username}
                onChange={InputHandler}
              />
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={data.email}
                onChange={InputHandler}
              />
              <label>Message</label>
              <textarea
                name="message"
                placeholder="Enter message"
                value={data.message}
                onChange={InputHandler}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>

      <div className="maps">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d1714.1224124361934!2d76.5579514!3d30.7677074!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1743488745652!5m2!1sen!2sin"
          width="100%"
          height="200"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
};

export default Contact;
