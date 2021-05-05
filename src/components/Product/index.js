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

    //////////////////////////
    // Render
    //////////////////////////

    const loaded = () => {
    const products = props.data.map((item, index) => {
        return (
            <Col
                key={index}
            >
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={item.image} />
                    <Card.Body>
                        <Card.Text>
                        {item.title}
                        </Card.Text>
                        <Card.Title>{`$${item.price.value}`}</Card.Title>
                        <Button 
                            variant="primary"
                            onClick={() => handleSelect({
                                title: item.title,
                                price: item.price.value,
                                image: item.image,
                                url: item.link,
                                asin: item.asin
                            })}
                            className={item.selected ? "hidden btn btn-primary" : "btn btn-primary"}
                        >Select Item</Button>
                        <Button 
                            variant="primary"
                            className={item.selected ? "btn btn-primary" : "hidden btn btn-primary"}
                        >Delete Item</Button>
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
            <h1>Loading...</h1>
        )
    }

    return props.data ? loaded() : loading()
}

export default Product