import React from "react"
import {Link} from "react-router-dom"

const Nav = () => {
    return (
        <div className="nav">
            <img className="logo" alt="wrappd logo" src="https://placeimg.com/200/100/any" />
            <ul className="options">
                <li>About</li>
                <Link to="/">
                    <li>New Gift</li>
                </Link>
            </ul>
        </div>
    )
}

export default Nav