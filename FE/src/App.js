import React from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Login from "./views/login/Login";
import Registration from "./views/registration/Registration";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/registration" exact element={<Registration />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/new" exact element={<NewBlogPost />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
