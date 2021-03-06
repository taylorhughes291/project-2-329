import React from "react"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import priceFilter from "../../functions/priceFilter.js"
import ranking from "../../functions/ranking.js"
import {useMediaQuery} from "react-responsive"
import primeLogo from "../../assets/Prime_0.png"

const Product = (props) => {
    
    //////////////////////////
    // Constants
    //////////////////////////

    const isTablet = useMediaQuery({query: '(min-width: 768px)'})
    const isDesktop = useMediaQuery({query: '(min-width: 961px)'})
    let numberResults = 5
    if (isTablet && !isDesktop) {
      numberResults = 8
    } else if (isDesktop) {
      numberResults = 12
    }
    const amazonAssociateId = process.env.REACT_APP_AMAZON_ASSOCIATES_ID

    //////////////////////////
    // Functions
    //////////////////////////

    const handleSelect = (obj) => {
        window.scrollTo(0, 0)
        // Attach the product info to the person's final selection
        const person = {
            ...props.person,
            selectedProducts: [
                ...props.person.selectedProducts,
                obj
            ]
        }

        
        //toggle the class of the object in data to selected = true
        const newResultsBank = props.resultsBank.map((item, index) => {
            if (item.asin === obj.asin) {
                return ({
                    ...item,
                    selected: true
                })
            } else {
                return (
                    item
                )
            }
        })

        props.setResultsBank(
            newResultsBank
        )
        props.setPerson(
            person
        )
    }

    const handleDelete = (asin, price) => {
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


        // Now we must toggle the class of the data object selected to selected = false
        const newResultsBank = props.resultsBank.map((item, index) => {
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

        props.setResultsBank(
            newResultsBank
        )

        props.setPerson(
            person
        )
    }

    // Next we need to declare a function that will open the browser to a new tab with the selected product.
    const handleProductLink = (url) => {
        window.open(url)
    }

    //Need to declare a function that handles favoriting an item
    const handleFavorite = (asin) => {
        // We must change the results bank to show this one item isFavorite = true
        // Then we must re-rank all products so that it gets sorted to the top.
        const newResultsBank = props.resultsBank.map((item, index) => {
            if (item.asin === asin) {
                return ({
                    ...item,
                    isFavorite: true
                })
            } else {
                return (
                    item
                )
            }
        })

        const newBudget = props.person.budget - props.sumTotal()
        const filteredArray = priceFilter(newResultsBank, newBudget)
        const rankedArray = ranking(filteredArray, newBudget, props.person.keywords)
        const newProductDisplay = rankedArray.splice(0, numberResults)
        props.setProductSearch(
            {
                productDisplay: newProductDisplay,
                displayBank: rankedArray
            }
        )

        props.setResultsBank(
            newResultsBank
        )
    }

    //Need to declare a function that handles un-favoriting an item
    const handleUnfavorite = (asin) => {
        // We must change the results bank to show this one item isFavorite = true
        // Then we must re-rank all products so that it gets sorted to the top.
        const newResultsBank = props.resultsBank.map((item, index) => {
            if (item.asin === asin) {
                return ({
                    ...item,
                    isFavorite: false
                })
            } else {
                return (
                    item
                )
            }
        })

        const newBudget = props.person.budget - props.sumTotal()
        const filteredArray = priceFilter(newResultsBank, newBudget)
        const rankedArray = ranking(filteredArray, newBudget, props.person.keywords)
        const newProductDisplay = rankedArray.splice(0, numberResults)
        props.setProductSearch(
            {
                productDisplay: newProductDisplay,
                displayBank: rankedArray
            }
        )

        props.setResultsBank(
            newResultsBank
        )
    }

    //////////////////////////
    // Render
    //////////////////////////

    const loaded = () => {
    const products = props.data.productDisplay.map((item, index) => {
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

        const associateLink = item.link + "&tag=" + amazonAssociateId

        return (
            <Col
                key={index}
                className="product"
            >
                <div 
                    className={item.selected ? "selected overlay" : "not-selected overlay"}
                ></div>
                <Card 
                    style={{ width: '18rem' }}
                >
                    <div className="img-button-cont">
                    <div className="img-cont">
                        <Card.Img 
                            variant="top" 
                            src={item.image}
                        />
                        <div 
                            className="img-link-overlay"
                            onClick={() => handleProductLink(associateLink)}
                        ></div>
                    </div>
                        <div className="button-cont">
                            <Button 
                                variant="primary"
                                onClick={() => handleSelect(item)}
                                className={item.selected ? "selected hidden btn btn-primary pink" : "btn btn-primary pink"}
                            >ADD TO CART</Button>
                            <Button 
                                variant="primary"
                                className={item.selected ? "selected btn btn-primary pink" : "hidden btn btn-primary pink"}
                                onClick={() => handleDelete(item.asin, item.price.value)}
                            >DELETE ITEM</Button>
                            <Button
                                className={item.isFavorite ? "isFavorite hidden btn btn-primary white" : "btn btn-primary white"}
                                onClick={() => handleFavorite(item.asin)}
                            >SAVE FOR LATER</Button>
                            <Button
                                className={item.isFavorite ? "isFavorite btn btn-primary white" : "hidden btn btn-primary white"}
                                onClick={() => handleUnfavorite(item.asin)}
                            >UN-SAVE</Button>
                        </div>
                    </div>
                        <Card.Body>
                            <div className="text-cont">
                                <Card.Text>
                                {item.title}
                                </Card.Text>
                                <div 
                                    className="text-link-overlay"
                                    onClick={() => handleProductLink(associateLink)}
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
        <>
            {products}
       </>
    )
    }

    const waiting = () => {
        return (
            <div className="loading-cont">
                <h3>Fill out the above to get started gifting!</h3>
                <i className="fas fa-gift fa-9x"></i>
            </div>
        )
    }

    return props.data.productDisplay.length > 0 ? loaded() : waiting()
}

export default Product