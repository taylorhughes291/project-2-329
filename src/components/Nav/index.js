import React from "react"
import {withRouter} from "react-router-dom"
import {Container} from "react-bootstrap"

const Nav = (props) => {

    //////////////////////////
    // Media Queries
    //////////////////////////


    

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