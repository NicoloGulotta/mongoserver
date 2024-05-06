import React from "react";
import { Container, Button } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";
import { Link } from "react-router-dom";
const Home = props => {
  return (
    <Container fluid="sm">

      <h1 className="blog-main-title mb-3">Benvenuto sullo Strive Blog!</h1>
      <Button as={Link} to="/new" className="blog-navbar-add-button bg-dark" >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-plus-lg"
          viewBox="0 0 16 16"
        >
          <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
        </svg>
        Nuovo Articolo
      </Button>
      <BlogList />
    </Container>
  );
};

export default Home;
