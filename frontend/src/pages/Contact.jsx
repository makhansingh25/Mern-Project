import { useState } from "react";
import banner from "../assets/images/contact.jpg";
import { useAuth } from "../store/Auth";

const Contact = () => {
  const [data, setdata] = useState({
    username: "",
    email: "",
    message: "",
  });
  const [user, setUser] = useState(true);
  const { users } = useAuth();

  if (user && users) {
    setdata({
      username: users.username,
      email: users.email,
      message: "",
    });
    setUser(false);
  }

  const Inputhandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setdata({
      ...data,
      [name]: value,
    });
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
      alert("message is submit succesfully");
    }
  };

  return (
    <>
      <div className="main-container">
        <div className="contact-container">
          <div className="image">
            <img src={banner} alt="" width="500px" height="400px" />
          </div>
          <div className="form-container">
            <h1>Contact Form</h1>
            <form onSubmit={InputSubmit}>
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="enter name"
                value={data.username}
                onChange={Inputhandler}
              />
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="enter email"
                value={data.email}
                onChange={Inputhandler}
              />
              <label>message</label>
              <textarea
                type="text"
                name="message"
                placeholder="enter message"
                value={data.message}
                onChange={Inputhandler}
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
