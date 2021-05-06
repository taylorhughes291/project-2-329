import React from "react"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"

const Product = (props) => {
    
    //////////////////////////
    // Constants
    //////////////////////////


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
        props.setPerson(
            person
        )
        
        //toggle the class of the object in data to selected = true
        const productDisplay = props.data.map((item, index) => {
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
        props.setProductSearch(
            productDisplay
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
        const productDisplay = props.data.map((item, index) => {
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
            productDisplay
        )
    }

    //////////////////////////
    // Render
    //////////////////////////

    const loaded = () => {
    const products = props.data.map((item, index) => {
        return (
            <Col
                key={index}
                className="product"
            >
                <Card style={{ width: '18rem' }}>
                    <div className="img-cont">
                        <Card.Img variant="top" src={item.image} />
                    </div>
                    <Card.Body>
                        <Card.Text>
                        {item.title}
                        </Card.Text>
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

    const loading = () => {
        return (
            <div className="loading-cont">
                <h3>Fill out the above to get started gifting!</h3>
                <i className="fas fa-gift fa-9x"></i>
            </div>
        )
    }

    return props.data ? loaded() : loading()
}

export default Product