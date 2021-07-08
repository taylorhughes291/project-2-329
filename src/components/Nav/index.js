import React from "react"
import {withRouter} from "react-router-dom"
import {Container} from "react-bootstrap"
import {useMediaQuery} from "react-responsive"

const Nav = (props) => {

    //////////////////////////
    // Media Queries
    //////////////////////////

    const isDesktop = useMediaQuery({query: '(min-width: 1024px)'})
    

    //////////////////////////
    // Functions
    //////////////////////////
   

      

    //////////////////////////
    // Render
    //////////////////////////

    return (
        <Container fluid>
            <div className={props.history.location.pathname === "/" ? "nav home-page" : "nav non-home"}>
                <div className="mobileCont">
                    <h1>GIFTHALLA</h1>
                    <div className="hamburger-cont">
                        {isDesktop && <button
                            onClick={props.handleContinue}
                        >SEARCH GIFTS</button>}
                        <i 
                            className="fas fa-bars fa-2x"
                        ></i>
                    </div>
                </div>

            </div>
        </Container>
    )
}

export default withRouter(Nav)