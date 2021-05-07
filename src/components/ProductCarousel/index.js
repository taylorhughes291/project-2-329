import React from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Product from "../Product"

const ProductCarousel = (props) => {
    return (
        <>
            <div className="product-carousel">
                <Container>
                    <Row>
                        <Product 
                            data={props.data}
                            setProductSearch={props.setProductSearch}
                            person={props.person}
                            setPerson={props.setPerson}
                            loading={props.loading}
                        />
                    </Row>
                </Container>

            </div>
        </>
    )
}

export default ProductCarousel