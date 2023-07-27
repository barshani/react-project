import { Link, NavLink } from "react-router-dom";
import { getAdmin, getBusiness, isAdmin, isBusiness, verifyToken } from "../auth/TokenManager";
import Logout from "../auth/Logout";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Container, Nav, Navbar } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
interface Props {
    background: string;
}
function Header({background}:Props) {
    return (

        <>
         <Navbar bg={background==='black'?'dark':'primary'} data-bs-theme='dark' collapseOnSelect expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#home">Bcard</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">About</NavLink>
            {verifyToken() &&<NavLink className="nav-link" to="/allCards">All Cards</NavLink>}
            {verifyToken() &&<NavLink className="nav-link" to="/favorites">Favorites</NavLink>}
            {verifyToken() && isBusiness()&&<NavLink className="nav-link" to="/mycards">My Cards</NavLink>}
          </Nav>
          <Nav>
         {!verifyToken() &&<NavLink className="nav-link" to="/signup">signup</NavLink>}
        {!verifyToken() &&<NavLink className="nav-link" to="/login">
              Login
            </NavLink>}
            {verifyToken() &&
          <NavDropdown title={<i className="bi bi-person-circle"></i>} id="basic-nav-dropdown">
             <Logout/>
             </NavDropdown>
         }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      </>
    );
}

export default Header;
