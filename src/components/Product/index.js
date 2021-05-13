import React from "react"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import priceFilter from "../../functions/priceFilter.js"
import ranking from "../../functions/ranking.js"
import {useMediaQuery} from "react-responsive"

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

    //////////////////////////
    // Functions
    //////////////////////////

    const handleSelect = (obj) => {
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

        const newBudget = props.person.budget - obj.price - props.sumTotal()
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
        props.setPerson(
            person
        )
    }

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
        const newProductDisplay = props.data.productDisplay.map((item, index) => {
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
        props.setProductSearch(
            {
                productDisplay: newProductDisplay,
                displayBank: props.data.displayBank
            }
        )
    }

    // Next we need to declare a function that will open the browser to a new tab with the selected product.
    const handleProductLink = (url) => {
        window.open(url)
    }

    //////////////////////////
    // Render
    //////////////////////////

    const loaded = () => {
    const products = props.data.productDisplay.map((item, index) => {
        return (
            <Col
                key={index}
                className="product"
            >
                <Card 
                    style={{ width: '18rem' }}
                >
                    <div 
                        className={item.selected ? "selected overlay" : "not-selected overlay"}
                    ></div>
                    <div className="img-cont">
                        <Card.Img 
                            variant="top" 
                            src={item.image}
                        />
                        <div 
                            className="img-link-overlay"
                            onClick={() => handleProductLink(item.link)}
                        ></div>
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
                                <Button 
                                    variant="primary"
                                    onClick={() => handleSelect({
                                        title: item.title,
                                        price: item.price.value,
                                        image: item.image,
                                        url: item.link,
                                        asin: item.asin
                                    })}
                                    className={item.selected ? "selected hidden btn btn-primary" : "btn btn-primary"}
                                >Select Item</Button>
                                <Button 
                                    variant="primary"
                                    className={item.selected ? "selected btn btn-primary" : "hidden btn btn-primary"}
                                    onClick={() => handleDelete(item.asin)}
                                >Delete Item</Button>
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