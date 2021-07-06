import React from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Product from "../Product"
import {useMediaQuery} from "react-responsive"

const ProductCarousel = (props) => {

    // Need to check is isMobile, isTablet, or isDesktop.
    const isTablet = useMediaQuery({query: '(min-width: 768px)'})
    const isDesktop = useMediaQuery({query: '(min-width: 961px)'})
    let seeMoreResults = 3
    if (isTablet && !isDesktop) {
      seeMoreResults = 4
    } else if (isDesktop) {
      seeMoreResults = 6
    }

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
                            resultsBank={props.resultsBank}
                            setResultsBank={props.setResultsBank}
                            handleSeeMore={props.handleSeeMore}
                            sumTotal={props.sumTotal}
                        />
                    </Row>
                </Container>
                {props.data.displayBank.length > 0 && <div 
                    className="see-more"
                    onClick={() => props.handleSeeMore(seeMoreResults, props.data.displayBank, false)}    
                >
                        <h5>More Products</h5>
                        <i className="fas fa-sort-down fa-3x"></i>
                </div>}

            </div>
        </>
    )
}

export default ProductCarousel