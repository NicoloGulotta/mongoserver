import React from "react";
import NavBar from "../components/navbar/BlogNavbar";
import Footer from "../components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import Login from "./views/login/Login";
import User from "./views/user/User";
import Registration from "./views/registration/Registration";
import New from "./views/new/New";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/me" element={<User />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/new" element={<New />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
