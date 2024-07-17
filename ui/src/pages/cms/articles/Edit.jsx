import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import * as Yup from "yup"
import { imgUrl, setValidationErrors } from "../../../lib"
import http from "../../../http"
import { Button, Col, Form, Row } from "react-bootstrap"
import { Loading } from "../../../components"

export const Edit = () => {
    const [categories, setCategories] = useState([])
    const [article, setArticle] = useState({})
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const params = useParams()

    const formik = useFormik({
        initialValues: {
            name: '',
            content: '',
            categoryId: '',
            image: null,
        },
        validationSchema: Yup.object({
            name: Yup.string().required(),
            content: Yup.string().required(),
            categoryId: Yup.string().required(),
            image: Yup.mixed().nullable().test('fileType', 'file must be a valid image', file => {
                if (file != null && !file.type.startsWith('image')) {
                    return false
                }

                return true
            })
        }),
        onSubmit: values => {
            let fd = new FormData

            for (let k in values) {
                fd.append(k, values[k])
            }

            http.patch(`/articles/${params.id}`, fd, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
                .then(() => navigate('/cms/articles'))
                .catch(({ response }) => {
                    setValidationErrors(response, formik)
                })
        }
    })

    useEffect(() => {
        setLoading(true)

        http.get('/categories')
            .then(({ data }) => {
                setCategories(data)

                return http.get(`/articles/${params.id}`)
            })
            .then(({ data }) => setArticle(data))
            .catch(() => { })
            .finally(() => setLoading(false))
    }, [params.id])

    useEffect(() => {
        formik.setValues({
            name: article.name,
            content: article.content,
            categoryId: article.categoryId,
            image: null
        })
    }, [article])

    return <Col className="bg-white py-3 my-3">
        <Row>
            <Col>
                <h1>Edit Article</h1>
            </Col>
        </Row>
        {loading ? <Loading /> : <Row>
            <Col>
                <Form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" id="name" name="name" required value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} isInvalid={formik.touched.name && formik.errors.name} />
                        {formik.touched.name && formik.errors.name && <Form.Control.Feedback type="invalid">
                            {formik.errors.name}
                        </Form.Control.Feedback>}
                    </div>
                    <div className="mb-3">
                        <Form.Label>Content</Form.Label>
                        <Form.Control as="textarea" id="content" name="content" required value={formik.values.content} onChange={formik.handleChange} onBlur={formik.handleBlur} isInvalid={formik.touched.content && formik.errors.content} />
                        {formik.touched.content && formik.errors.content && <Form.Control.Feedback type="invalid">
                            {formik.errors.content}
                        </Form.Control.Feedback>}
                    </div>
                    <div className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select id="categoryId" name="categoryId" required value={formik.values.categoryId} onChange={formik.handleChange} onBlur={formik.handleBlur} isInvalid={formik.touched.categoryId && formik.errors.categoryId}>
                            <option value="">Select a category</option>
                            {categories.map(category => <option value={category._id}>{category.name}</option>)}
                        </Form.Select>
                        {formik.touched.categoryId && formik.errors.categoryId && <Form.Control.Feedback type="invalid">
                            {formik.errors.categoryId}
                        </Form.Control.Feedback>}
                    </div>
                    <div className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" id="image" name="image" onChange={({ target }) => formik.setFieldValue('image', target.files[0])} onBlur={formik.handleBlur} isInvalid={formik.touched.image && formik.errors.image} accept="image/*" />
                        {formik.touched.image && formik.errors.image && <Form.Control.Feedback type="invalid">
                            {formik.errors.image}
                        </Form.Control.Feedback>}
                        {article.image && <img src={imgUrl(article.image)} className="img-fluid mt-3" />}
                    </div>

                    <Button type="submit" variant="dark">Save</Button>
                </Form>
            </Col>
        </Row>}
    </Col>
}