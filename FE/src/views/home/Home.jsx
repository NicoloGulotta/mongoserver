// Home.js (receiving data as a prop)
import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BlogFetcher from '../../data/blogFetch';
import BlogList from '../../components/blog/blog-list/BlogList';
import User from '../user/User';
const Home = () => {
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    BlogFetcher(fetchedData => setBlogData(fetchedData)); // Call BlogFetcher
  }, []);

  return (
    <Container fluid="sm">
      <Button as={Link} to="/new" className="blog-navbar-add-button bg-dark mt-4" size="lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-plus-lg "
          viewBox="0 0 16 16"
        >
          <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
        </svg>
        Nuovo Articolo
      </Button>
      <h1 className="blog-main-title mb-3">Benvenuto sul Blog!</h1>
      {blogData && <BlogList blogData={blogData} />}
      <User />
    </Container>
  );
};

export default Home;
