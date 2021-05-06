import React from "react"
import SelectedProduct from "../components/SelectedProduct"

const FinalCart = (props) => {

    //////////////////////////
    // Constants
    //////////////////////////

    const asins = props.person.selectedProducts.map((item, index) => {
        return (
            item.asin
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
        let urlParam = ""
        for (let i = 1; i <= asins.length; i += 1) {
            if (i !== 1) {
                urlParam = urlParam + "&"
            }
            urlParam = urlParam + `ASIN.${i}=${asins[i-1]}&Quantity.${i}=1`
        }
        const url = `https://www.amazon.com/gp/aws/cart/add.html?${urlParam}&AssociateTag=taylorhughe05-20`
        window.open(url)
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