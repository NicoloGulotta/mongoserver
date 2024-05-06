import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import logo from "../../assets/logo.png";
import "./styles.css";
import { Link } from "react-router-dom";

const NavBar = props => {
  return (
    <Navbar expand="lg" className="blog-navbar" fixed="top">
      <Container className="justify-content-between">
        <Navbar.Brand as={Link} to="/">
          <img className="blog-navbar-brand" alt="logo" src={logo} />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavBar;
