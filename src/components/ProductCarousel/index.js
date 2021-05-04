import React from "react"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const ProductCarousel = (props) => {
    return (
        <div className="product-carousel">
            <Container>
                <Row>
                    <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://picsum.photos/286/180" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default ProductCarousel