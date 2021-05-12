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

    // Need to have a sum total of selected items.
    const sumTotal = () => {
        let sum = 0
        for (const obj of props.person.selectedProducts) {
            sum = sum + obj.price
        }
        return parseFloat(Math.trunc(sum*100)/100).toFixed(2)
    }

    return (
        <>
            {props.data.productDisplay.length > 0 && <>
            <div className="sum-total-cont">
                <h4
                    className={sumTotal() > props.person.budget ? "sum-total over" : "sum-total"}
                >Budget Used: ${sumTotal()} / ${props.person.budget}</h4>
            </div>
            </>}
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
                {props.data.displayBank.length > 0 && <div 
                    className="see-more"
                    onClick={() => props.handleSeeMore(seeMoreResults, props.data.displayBank)}    
                >
                        <h5>More Products</h5>
                        <i className="fas fa-sort-down fa-3x"></i>
                </div>}

            </div>
        </>
    )
}

export default ProductCarousel