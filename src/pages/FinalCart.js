import React from "react"
import SelectedProduct from "../components/SelectedProduct"

const FinalCart = (props) => {

    //////////////////////////
    // Constants
    //////////////////////////

    const links = props.person.selectedProducts.map((item, index) => {
        return (
            <h2
                key={index}
            ><a href={item.url}>{item.title}</a></h2>
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
        return sum
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
            <h3>Total Cost: {sumTotal()}</h3>
            <h2>Product Links:</h2>
            <div>{links}</div>
        </div>
    )
}

export default FinalCart