import React from "react"
import {Carousel, Jumbotron, Container} from "react-bootstrap"
import amazonLogo from "../assets/amazon.png"
import ebayLogo from "../assets/ebay.png"
import etsyLogo from "../assets/etsy.png"

const LandingPage = (props) => {
    return (
        <div className="landing-cont">
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
            <div className="search-cont">
                <div className="search-title">
                    <h2>SEARCH GIFTS</h2>
                </div>
                <div className="search">
                    <p>Our search results are based on keywords. Just tell us three things your giftee likes!</p>
                    <form>
                        <input type="text" placeholder="Coffee"></input>
                        <input type="text" placeholder="Star Wars"></input>
                        <input type="text" placeholder="Succulents"></input>
                        <input type="submit" value="CONTINUE"></input>
                    </form>
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