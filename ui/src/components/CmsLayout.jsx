import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "react-toastify/ReactToastify.css"

import { Container, Nav, Navbar, NavbarBrand, NavbarCollapse } from "react-bootstrap"
import { NavLink } from "react-router-dom"

export const CmsLayout = () => {
    return <>
        <Navbar bg="dark" data-bs-theme="dark" expand="lg">
            <Container>
                <NavbarBrand>MERN NCIT</NavbarBrand>
                <Navbar.Toggle />
                <NavbarCollapse>
                    <Nav>
                        <Nav.Item>
                            <NavLink className="nav-link" to="/cms/dashboard">Home</NavLink>
                        </Nav.Item>
                    </Nav>
                </NavbarCollapse>
            </Container>
        </Navbar>
    </>
}