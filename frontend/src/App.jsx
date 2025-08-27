import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import About from "./pages/Newcar";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageNotFound from "./pages/PageNotFound";
import Logout from "./pages/Logout";
// import AdminPage from "./components/AdminLayout/AdminPage";
// import AdminUser from "./components/adminlayout/AdminUser";
// import AdminContact from "./components/adminlayout/AdminContact";
// import UpdateUser from "./components/adminlayout/AdminUpdate";
import Addcar from "./pages/Addcar";
import Newcar from "./pages/Newcar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addcar" element={<Addcar />} />
          <Route path="/newcar" element={<Newcar />} />
          <Route path="/service" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<PageNotFound />} />
          {/* <Route path="/admin" element={<AdminPage />}>
            <Route path="users" element={<AdminUser />} />
            <Route path="contact" element={<AdminContact />} />
            <Route path="updateuser/:id" element={<UpdateUser />} />
          </Route> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
