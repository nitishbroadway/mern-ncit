import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "react-toastify/ReactToastify.css"
import "./CmsLayout.css"

import { Container, Row } from "react-bootstrap"
import { CmsNav } from "./CmsNav"
import { Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fromStorage, removeStorage } from "../lib"
import http from "../http"
import { setUser } from "../store/user.slice"
import { useEffect, useState } from "react"
import { Loading } from "./Loading"

export const CmsLayout = () => {
    const user = useSelector(state => state.user.value)

    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()

    useEffect(() => {
        setLoading(true)

        if(!user) {
            const token = fromStorage('mern-ncit-token')

            if(token) {
                http.get('/profile/details')
                    .then(({ data }) => dispatch(setUser(data)))
                    .catch(() => removeStorage('mern-ncit-token'))
                    .finally(() => setLoading(false))
            } else {
                setLoading(false)
            }
        } else {
            setLoading(false)
        }
    }, [user])

    return loading ? <Loading /> : <>
        
        {user != null && <CmsNav />}

        <Container>
            <Row>
                <Outlet />
            </Row>
        </Container>
    </>
}