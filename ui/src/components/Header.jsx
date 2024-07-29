import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";

const Header = () => {

  const navigate = useNavigate();

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate(e.target.getAttribute("href"));
  }

  return (
    <header className="mb-3" style={{ boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)" }}>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="/" onClick={handleNavigate}>
            Group 2
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/" onClick={handleNavigate}>
                Home
              </Nav.Link>
              <Nav.Link href="/retirements" onClick={handleNavigate}>
                UpComing Retirement
              </Nav.Link>
              <Nav.Link href="/add" onClick={handleNavigate}>
                New Employee
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
