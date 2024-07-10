import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "react-toastify/ReactToastify.css"

import { Col, Container, Row } from "react-bootstrap"
import { CmsNav } from "./CmsNav"
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

export const CmsLayout = () => {
    const user = useSelector(state => state.user.value)

    return <>
        
        {user != null && <CmsNav />}

        <Container>
            <Row>
                <Outlet />
            </Row>
        </Container>
    </>
}