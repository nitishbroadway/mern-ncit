import { useEffect, useState } from "react"
import { Col, Row, Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import http from "../../../http"
import { Loading } from "../../../components"
import { imgUrl } from "../../../lib"

export const List = () => {
    const [articles, setArtilces] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        http.get('/articles')
            .then(({ data }) => setArtilces(data))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    return <Col className="bg-white py-3 my-3">
        {loading ? <Loading /> : <Row>
            <Col>
                <h1>Articles</h1>
            </Col>
            <Col xs="auto">
                <Link to="/cms/articles/create" className="btn btn-dark">Add Article</Link>
            </Col>
            <Col xs="12">
                {articles.length > 0 ? <Table size="sm" bordered striped hover>
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map(article => <tr>
                            <td>{article.name}</td>
                            <td>
                                {article.image && <a href={imgUrl(article.image)} target="_blank">
                                    <img src={imgUrl(article.image)} className="img-sm" />    
                                </a>}
                            </td>
                            <td>{article.category.name}</td>
                            <td></td>
                        </tr>)}
                    </tbody>
                </Table> : <h4 className="text-muted">No data found</h4>}
            </Col>
        </Row>}
    </Col>
}