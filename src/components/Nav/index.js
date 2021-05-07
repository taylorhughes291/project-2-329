import React, { useEffect, useState } from "react"
import {Link} from "react-router-dom"
import {useMediaQuery} from "react-responsive"
import logo from "./assets/WrappdAltLogo.png"
import {Container, Modal, Button} from "react-bootstrap"

const Nav = (props) => {

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
    
    
    function ResetModal() {
        const [show, setShow] = useState(false);
        const handleShow = () => setShow(true);
        const handleClose = () => setShow(false);
        const handleCloseReset = () => {
            handleClose()
            props.handleReset()
        }
      
        return (
          <>
            <li onClick={handleShow}>
              New Gift
            </li>
      
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Are you sure you want to reset?</Modal.Title>
              </Modal.Header>
              <Modal.Body>Resetting will eliminate all your great selections!</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Link to="/">
                    <Button variant="primary" onClick={handleCloseReset}>
                    Reset
                    </Button>
                </Link>
              </Modal.Footer>
            </Modal>
          </>
        );
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
                            <ResetModal />
                        </ul>
                    </div>
                </>}

            </div>
        </Container>
    )
}

export default Nav