import React from "react"
import SelectedProduct from "../components/SelectedProduct"

const FinalCart = (props) => {

    //////////////////////////
    // Constants
    //////////////////////////

    const links = props.person.selectedProducts.map((item, index) => {
        return (
            item.url
        )
    })

    //////////////////////////
    // Functions
    //////////////////////////
    
    const sumTotal = () => {
        let sum = 0
        for (const obj of props.person.selectedProducts) {
            sum = sum + obj.price
        }
        return parseFloat(Math.trunc(sum*100)/100).toFixed(2)
    }

    const handleCheckout = () => {
        for (const link of links) {
           setTimeout(window.open(link), 2000)
        }
    }

    //////////////////////////
    // Render
    //////////////////////////

    return (
        <div className="cart-cont">
            <h2 className="title">{`${props.person.name}'s Gifts`}</h2>
            <SelectedProduct 
                person={props.person}
                setPerson={props.setPerson}
                productSearch={props.productSearch}
                setProductSearch={props.setProductSearch}
            />
            <h3>Total Cost: {`$${sumTotal()}`}</h3>
            <button
                type="button"
                onClick={handleCheckout}
            >Take me to the Products</button>
        </div>
    )
}

export default FinalCart