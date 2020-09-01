import React from 'react'

import {Navbar, Nav} from 'react-bootstrap'

import { Link } from 'react-router-dom'

const Header: React.FC = () => {
    return (
          <Navbar bg="dark"  expand="lg">
            <Navbar.Brand href="#home"  >Tasks </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Item as={Link} to="/" className="nav-link" color="#fff">Inicio</Nav.Item>
                <Nav.Item as={Link} to="/tarefas" className="nav-link" >Tarefas</Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
    )
}

export default Header
