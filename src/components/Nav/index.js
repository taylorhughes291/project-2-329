import React from "react"
import {Link} from "react-router-dom"
import {useMediaQuery} from "react-responsive"

const Nav = () => {

    //////////////////////////
    // Media Queries
    //////////////////////////

    const isTablet = useMediaQuery({ query: '(max-width: 1023px)' })
    const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
    

    //////////////////////////
    // Render
    //////////////////////////

    return (
        <div className="nav">
            <img className="logo" alt="wrappd logo" src="https://placeimg.com/200/100/any" />
            <div className="hamburger-cont">
                <i className="fas fa-bars fa-3x"></i>
            </div>
            <ul className="options hidden">
                <li>About</li>
                <Link to="/">
                    <li>New Gift</li>
                </Link>
            </ul>
        </div>
    )
}

export default Nav