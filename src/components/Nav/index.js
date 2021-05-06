import React, { useEffect, useState } from "react"
import {Link} from "react-router-dom"
import {useMediaQuery} from "react-responsive"
import logo from "./assets/WrappdAltLogo.png"
import Container from "react-bootstrap/Container"

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
        <Container fluid>
            <div className="nav">
                <div className="mobileCont">
                    <img src="https://i.imgur.com/b3520VX.png?1" alt="wrappd logo"/>
                    {!isTablet && <div className="hamburger-cont">
                        <i 
                            className="fas fa-bars fa-2x"
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
        </Container>
    )
}

export default Nav