import React, { useState } from "react"
import {Link, withRouter} from "react-router-dom"
import {useMediaQuery} from "react-responsive"
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
            <div className={props.history.location.pathname === "/" ? "nav home-page" : "nav"}>
                <div className="mobileCont">
                    <h1>GIFTHALLA</h1>
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

export default withRouter(Nav)