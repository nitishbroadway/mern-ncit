import { Button, Col, Form, Row } from "react-bootstrap"
import { useFormik } from "formik"
import { useState } from "react"
import * as Yup from "yup"

export const Login = () => {
    const [remember, setRemember] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().required().email(),
            password: Yup.string().required()
        }),
        onSubmit: (values) => {
            console.log(values)
        }
    })

    return <Col lg={4} className="bg-white py-3 my-5 mx-auto">
        <Row>
            <Col className="text-center">
                <h1>Login</h1>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" id="email" name="email" required value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} isInvalid={formik.touched.email && formik.errors.email} />
                        {formik.touched.email && formik.errors.email && <Form.Control.Feedback type="invalid">
                            {formik.errors.email}
                        </Form.Control.Feedback>}
                    </div>
                    <div className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" id="password" name="password" required onChange={formik.handleChange} onBlur={formik.handleBlur} isInvalid={formik.touched.password && formik.errors.password} />
                        {formik.touched.password && formik.errors.password && <Form.Control.Feedback type="invalid">
                            {formik.errors.password}
                        </Form.Control.Feedback>}
                    </div>
                    <Form.Check className="mb-3">
                        <Form.Check.Input name="remember" id="remember" checked={remember} onChange={() => setRemember(!remember)} />
                        <Form.Check.Label htmlFor="remember">Remember Me</Form.Check.Label>
                    </Form.Check>
                    <Button type="submit" variant="dark">Log In</Button>
                </Form>
            </Col>
        </Row>
    </Col>
}