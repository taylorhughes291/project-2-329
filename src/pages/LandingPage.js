import React, {useState} from "react"
import {Carousel, Jumbotron, Container} from "react-bootstrap"
import LandingModal from "../components/LandingModal"
import amazonLogo from "../assets/amazon.png"
import ebayLogo from "../assets/ebay.png"
import etsyLogo from "../assets/etsy.png"

const LandingPage = (props) => {

    /////////////////////////////
    // Constants
    /////////////////////////////
    
    const { person, handleKeywordChange1, handleKeywordChange2, handleKeywordChange3, handleBudgetChange } = props
    const [modalShow, setModalShow] = useState(false);
    const [processFlow, setProcessFlow] = useState({
        keywords: false,
        budget: false,
        name: false
    })

    /////////////////////////////
    // Functions
    /////////////////////////////

   
    
    const handleContinue = (event) => {
        event.preventDefault()
        if (person.keywordText1 !== "" || person.keywordText2 !== "" || person.keywordText3 !== "") {
            setProcessFlow({
                ...processFlow,
                keywords: true
            })
        }
        setModalShow(true)
    }
      

    /////////////////////////////
    // Render
    /////////////////////////////

    return (
        <div 
            className="landing-cont"
            key="landing-cont-1"
        >
            <div className="landing-page-cont">
                <h1 className="hero">Find a glorious gift in just a few clicks!</h1>
                <Carousel>
                    <Carousel.Item interval={5000}>
                        <img
                        className="d-block w-100"
                        src="https://placeimg.com/300/300/any"
                        alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={5000}>
                        <img
                        className="d-block w-100"
                        src="https://placeimg.com/300/300/any"
                        alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={5000}>
                        <img
                        className="d-block w-100"
                        src="https://placeimg.com/300/300/any"
                        alt="Third slide"
                        />
                    </Carousel.Item>
                    </Carousel>
            </div>
            <div className="subtext-marketplace-cont">
                <p>Find the best products from your favorite marketplaces.</p>
                <div className="markets-cont">
                    <img src={amazonLogo} alt="Amazon logo" />
                    <img src={ebayLogo} alt="eBay logo" />
                    <img src={etsyLogo} alt="Etsy logo" />
                </div>
            </div>
            <div 
                className="search-cont"
                key="search-cont-div-1"
            >
                <div className="search-title">
                    <h2>SEARCH GIFTS</h2>
                </div>
                <div 
                    className="search"
                    key="search-div"
                >
                    <p>Our search results are based on keywords. Just tell us three things your giftee likes!</p>
                    <form
                        onSubmit={handleContinue}
                    >
                        <input 
                            type="text" 
                            placeholder="Coffee"
                            value={props.person.keywordText1}
                            onChange={props.handleKeywordChange1}
                        ></input>
                        <input 
                            type="text" 
                            placeholder="Star Wars"
                            value={props.person.keywordText2}
                            onChange={props.handleKeywordChange2}
                        ></input>
                        <input 
                            type="text" 
                            placeholder="Succulents"
                            value={props.person.keywordText3}
                            onChange={props.handleKeywordChange3}
                        ></input>
                        <input 
                            type="submit" 
                            value="CONTINUE"
                        ></input>
                    </form>
                    <LandingModal
                        key="landing-modal-1"
                        processFlow={processFlow}
                        handleContinue={handleContinue}
                        person={person}
                        handleKeywordChange1={handleKeywordChange1}
                        handleKeywordChange2={handleKeywordChange2}
                        handleKeywordChange3={handleKeywordChange3}
                        handleBudgetChange={handleBudgetChange}
                        modalShow={modalShow}
                        setModalShow={setModalShow}
                    />
                </div>
            </div>
            <div className="footer-image">
            <Jumbotron fluid>
                <Container>
                    <h2>Your quest for an awesome gift is over!</h2>
                </Container>
            </Jumbotron>
            </div>
        </div>

    )
}

export default LandingPage