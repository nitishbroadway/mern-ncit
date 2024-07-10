import { Container, Nav, Navbar, NavbarBrand } from "react-bootstrap"
import { NavLink } from "react-router-dom"

export const CmsNav = () => {
    return <Navbar bg="dark" data-bs-theme="dark" expand="lg">
        <Container>
            <NavbarBrand>MERN NCIT</NavbarBrand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Nav>
                    <Nav.Item>
                        <NavLink className="nav-link" to="/cms/dashboard">Home</NavLink>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
}