import React, {useState} from "react"
import {Carousel, Jumbotron, Container} from "react-bootstrap"
import {Link} from "react-router-dom"
import LandingModal from "../components/LandingModal"
import amazonLogo from "../assets/amazon.png"
import ebayLogo from "../assets/ebay.png"
import etsyLogo from "../assets/etsy.png"
import landingImages from "../assets/landingImages.js"
import search from "../assets/search.png"
import rightArrow from "../assets/right-arrow.png"
import testimonialOne from "../assets/testimonial-1.jpg"

const LandingPage = (props) => {

    /////////////////////////////
    // Constants
    /////////////////////////////
    
    const { person, handleKeywordChange1, handleKeywordChange2, handleKeywordChange3, handleBudgetChange } = props
    const [modalShow, setModalShow] = useState(false);
    const [processFlow, setProcessFlow] = useState({
        keywords: false,
        budget: false
    })

    console.log(props.history);

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


    const selectionArray = []
    let counter = 0
    while (counter < 5) {
        const selection = Math.floor(Math.random() * landingImages.length)
        if (!selectionArray.includes(selection)) {
            selectionArray.push(selection)
            counter += 1
        }
    }
     console.log(selectionArray); 

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
                <div className="carousel-cont">
                    <Carousel>
                        <Carousel.Item interval={5000}>
                            <img
                            className="d-block w-100"
                            src={landingImages[selectionArray[0]]}
                            alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item interval={5000}>
                            <img
                            className="d-block w-100"
                            src={landingImages[selectionArray[1]]}
                            alt="Second slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item interval={5000}>
                            <img
                            className="d-block w-100"
                            src={landingImages[selectionArray[2]]}
                            alt="Third slide"
                            />
                        </Carousel.Item>
                    </Carousel>
                </div>
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
                className="search-title"
                onClick={handleContinue}
            >
                    <h2>SEARCH GIFTS</h2>
            </div>
            <div 
                className="search-cont"
                key="search-cont-div-1"
            >

                <div 
                    className="search"
                    key="search-div"
                >
                    <img src={search} alt="search icon" />
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
                        setProcessFlow={setProcessFlow}
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
            <div className="explore-banner">
                <h3>Need Some Inspiration?</h3>
            </div>
            <div className="first inspiration-banner">
                <div className="inspiration-img-cont">
                    <img src={landingImages[selectionArray[3]]} alt="generic product" />
                </div>
                <h5>Gifts for the person who has everything</h5>
                <Link to="/">
                    <div className="link-cont">
                        <h5>Explore gifts</h5>
                        <img src={rightArrow} alt="right arrow indicating a link to another page" /> 
                    </div>
                </Link>
            </div>
            <div className="second inspiration-banner">
                <div className="inspiration-img-cont">
                    <img src={landingImages[selectionArray[4]]} alt="generic product" />
                </div>
                <h5>Gifts for the person who has everything</h5>
                <Link to="/">
                    <div className="link-cont">
                        <h5>Explore gifts</h5>
                        <img src={rightArrow} alt="right arrow indicating a link to another page" /> 
                    </div>
                </Link>
            </div>
            <div className="third inspiration-banner">
                <div className="inspiration-img-cont">
                    <img src={testimonialOne} alt="generic product" />
                </div>
                <div className="testimonial-cont">
                    <h6>I thought Mother’s Day was next weekend! Thank Odin I found Gifthalla. Mom loves the lavender candle and Poo-Pourri.</h6>
                    <h6 className="bold">Sam Nusbaum</h6>
                    <h6>Real Gifthalla User</h6>
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