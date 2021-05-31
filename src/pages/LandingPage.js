import React, { useState } from "react"
import {Link} from "react-router-dom"
import {useMediaQuery} from "react-responsive"
import {Container, Modal, Button} from "react-bootstrap"

const LandingPage = (props) => {
    return (
        <Container fluid>
            <div className="landing-nav">
                <div className="mobileCont">
                    <h1>GIFTHALLA</h1>
                    <div className="hamburger-cont">
                        <button>SEARCH GIFTS</button>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default LandingPage