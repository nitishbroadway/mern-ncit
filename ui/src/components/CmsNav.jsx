import { Button, Container, Nav, Navbar, NavbarBrand, NavDropdown } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { removeStorage } from "../lib"
import { clearUser } from "../store/user.slice"

export const CmsNav = () => {
    const user = useSelector(state => state.user.value)

    const dispatch = useDispatch()

    const handleLogout = () => {
        removeStorage('mern-ncit-token')

        dispatch(clearUser())
    }

    return <Navbar bg="dark" data-bs-theme="dark" expand="lg">
        <Container>
            <NavbarBrand>MERN NCIT</NavbarBrand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Nav className="me-auto">
                    <Nav.Item>
                        <NavLink className="nav-link" to="/cms/dashboard">Home</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink className="nav-link" to="/cms/articles">Articles</NavLink>
                    </Nav.Item>
                </Nav>
                <Nav>
                    <NavDropdown title={user.name} align="end">
                        <Button variant="link" className="link-light text-decoration-none" onClick={handleLogout}>Logout</Button>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
}