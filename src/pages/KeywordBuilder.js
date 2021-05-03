import React from "react"
import {Link} from "react-router-dom"
import ProductCarousel from "../components/ProductCarousel"

const KeywordBuilder = () => {
    return (
        <div>
            <form>
                <input type="text" placeholder="Person"></input>
                <input type="number" placeholder="Budget"></input>
                <input type="text" placeholder="Keywords"></input>
            </form>
            <ProductCarousel />
            <Link to="/finalcart">
                <button>Finalize Cart</button>
            </Link>
        </div>
    )
}

export default KeywordBuilder