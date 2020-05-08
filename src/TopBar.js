import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { withRouter } from "react-router-dom";
function TopBar({ location }) {
  React.useEffect(() => {});
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Navbar.Brand href="#home">Photo App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/" active={location.pathname == "/"}>
            Home
          </Nav.Link>
          <Nav.Link
            href="/imagesearch"
            active={location.pathname == "/imagesearch"}
          >
            Search
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default withRouter(TopBar);