import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const MyNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Bookify</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/book/list">Add Listing</Nav.Link>
          <Nav.Link as={Link} to="/book/orders">Orders</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
