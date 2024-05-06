import React from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import Login from "./views/login/Login";
import NewBlogPost from "./views/new/New";
import RegistrationForm from "./views/registration/Registration";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        < Route path="/registration" exact element={<RegistrationForm />} />
        <Route path="/" exact element={<Login />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/new" element={<NewBlogPost />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
