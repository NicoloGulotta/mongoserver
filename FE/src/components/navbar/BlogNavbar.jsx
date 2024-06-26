import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./styles.css";
const NavBar = props => {
  return (
    <Navbar expand="lg" className="blog-navbar" fixed="top">
      <Container className="justify-content-between">
        <Navbar.Brand as={Link} to="/home">
          <img className="blog-navbar-brand" alt="logo" src={logo} />
        </Navbar.Brand>
        {/* aggiungere button profile  */}
      </Container>
    </Navbar>
  );
};

export default NavBar;
