import React from "react"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import primeLogo from "../../assets/Prime_0.png"

const SelectedProduct = (props) => {

    const handleDelete = (asin) => {
        // Need to first delete the product from the person useState at selectedProduct
        const newSelectedProducts = props.person.selectedProducts.filter((item, index) => {
            return (
                item.asin !== asin
            )
        })
        const person = {
            ...props.person,
            selectedProducts: newSelectedProducts
        }
        props.setPerson(
            person
        )

        // Now we must toggle the class of the data object selected to selected = false
        const resultsBank = props.resultsBank.map((item, index) => {
            if (item.asin === asin) {
                return ({
                    ...item,
                    selected: false
                })
            } else {
                return (
                    item
                )
            }
        })
        props.setResultsBank(resultsBank)
    }

    // Next we need to declare a function that will open the browser to a new tab with the selected product.
    const handleProductLink = (url) => {
        window.open(url)
    }

    const selections = props.person.selectedProducts.map((item, index) => {
        const roundedRating = Math.round(item.rating * 2) / 2
        const ratingArray = []
        for (let i = 1; i <= 5; i+= 1) {
            if (roundedRating >= i) {
                ratingArray.push(1)
            } else if (roundedRating > i - 1) {
                ratingArray.push(0.5)
            } else {
                ratingArray.push(0)
            }
        }
        const ratingRender = ratingArray.map((item, index) => {
            if (item === 1) {
                return (
                    <i className="fas fa-star" key={index} ></i>
                )
            } else if (item === 0) {
                return (
                    <i className="far fa-star" key={index} ></i>
                )
            } else {
                return (
                    <i className="fas fa-star-half-alt" key={index} ></i>
                )
            }
        })
        return (
            <Col
                key={index}
                className="product"
            >
                <Card 
                    style={{ width: '18rem' }}
                >
                    <div className="img-button-cont">
                        <div className="img-cont">
                            <Card.Img 
                                variant="top" 
                                src={item.image}
                            />
                        </div>
                        <div className="button-cont">
                            <Button 
                                variant="primary"
                                className="btn btn-primary pink"
                                onClick={() => handleDelete(item.asin, item.price.value)}
                            >DELETE ITEM</Button>
                        </div>
                    </div>
                    <Card.Body>
                        <div className="text-cont">
                            <Card.Text>
                            {item.title}
                            </Card.Text>
                            <div 
                                className="text-link-overlay"
                                onClick={() => handleProductLink(item.link)}
                            ></div>
                        </div>
                        <div className="price-button-cont">
                            <Card.Title>{`$${parseFloat(Math.trunc(item.price.value*100)/100).toFixed(2)}`}</Card.Title>
                            {item.is_prime && <img className="prime-logo" src={primeLogo} alt="Amazon Prime Logo" />}
                            {item.delivery && <div className="shipping-delivery-cont">
                                {item.delivery.price && <p className="shipping">{item.delivery.price.raw}</p>}
                                {item.delivery.tagline && <p className="delivery">{item.delivery.tagline}</p>}
                            </div>}
                            <div className="ratings-cont">
                                <div className="stars-cont">
                                {item.ratings_total > 0 && ratingRender}
                                </div>
                                <p>({item.ratings_total})</p>                                    
                            </div>

                        </div>
                    </Card.Body>
                </Card>
            </Col>
        )
    })
    return (
        <div>
            {selections}
        </div>
    )
}

export default SelectedProduct