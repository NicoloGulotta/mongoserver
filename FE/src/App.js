import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/BlogNavbar';
import Footer from './components/footer/Footer';
import Home from './views/home/Home';
import Blog from './views/blog/Blog';
import New from './views/new/New';
import blogFetcher from './data/blogFetch';
import blogContext, { BlogProvider } from '../src/blogContext/blogContext';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>Not Found</div>} />
        <Route path="/home">
          <Route index element={<Home />} />
          <Route path=":id" element={<Blog />} />
        </Route>
        <Route path="/new" element={<New />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
