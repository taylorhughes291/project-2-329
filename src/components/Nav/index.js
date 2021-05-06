import React, { useEffect, useState } from "react"
import {Link} from "react-router-dom"
import {useMediaQuery} from "react-responsive"

const Nav = () => {

    //////////////////////////
    // Media Queries
    //////////////////////////


    let [menuClicked, setMenuClicked] = useState(false)
    const isTablet = useMediaQuery({query: '(min-width: 768px)'})

    //////////////////////////
    // Functions
    //////////////////////////

    const handleClick = () => {
            if (menuClicked === false) {
                setMenuClicked(true)
            } else {
                setMenuClicked(false)
            }
    }

    //////////////////////////
    // Render
    //////////////////////////

    return (
        <div className="nav">
            <div className="mobileCont">
                <img className="logo" alt="wrappd logo" src="https://placeimg.com/200/100/any" />
                {!isTablet && <div className="hamburger-cont">
                    <i 
                        className="fas fa-bars fa-3x"
                        onClick={handleClick}
                    ></i>
                </div>}
            </div>
            {(menuClicked || isTablet) && <>
                <div className="options-cont">
                    <ul className="options">
                        <li>About</li>
                        <Link to="/">
                            <li>New Gift</li>
                        </Link>
                    </ul>
                </div>
            </>}

        </div>
    )
}

export default Nav