import React from "react"
import SelectedProduct from "../components/SelectedProduct"
import {Link} from "react-router-dom"
import arrowBack from "../assets/arrow-back.png"

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
            sum = sum + obj.price.value
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
            <div className="return-title-cont">
                <Link to="/giftsearch">
                    <img src={arrowBack} alt="go back to product page" />
                </Link>
                <h2>Shopping Cart</h2>
            </div>
            <div className="subtotal">
                <h3>Subtotal: {`$${sumTotal()}`}</h3>
            </div>
            <div className="description">
                <p>Once you are happy with your cart, we will send you to your marketplace account(s) to complete your purchase. Your Gifthalla items will already be in your cart for checkout!</p>
            </div>
            <div 
                className="search-title"
                onClick={handleCheckout}
            >
                <h4>PROCEED TO CHECKOUT</h4>
            </div>
            <SelectedProduct 
                person={props.person}
                setPerson={props.setPerson}
                productSearch={props.productSearch}
                setProductSearch={props.setProductSearch}
            />
        </div>
    )
}

export default FinalCart