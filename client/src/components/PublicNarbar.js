import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../logo.svg";
import { Link } from "react-router-dom";
const PublicNavbar = () => {
    return (
      <Navbar bg="light" expand="lg">
          <Navbar.Brand className="mr-auto">
            <img src={logo} alt="CoderSchool" width="50px" />
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} exact to="/reading">
              Reading List
            </Nav.Link>
          </Nav>
		</Navbar>
    );
  };
  export default PublicNavbar;