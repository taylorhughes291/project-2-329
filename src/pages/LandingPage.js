import React, {useEffect} from "react"
import {Carousel, Jumbotron, Container} from "react-bootstrap"
import amazonLogo from "../assets/amazon.png"
import ebayLogo from "../assets/ebay.png"
import etsyLogo from "../assets/etsy.png"
import amazonLogoTablet from "../assets/amazon-tablet.png"
import ebayLogoTablet from "../assets/ebay-tablet.png"
import etsyLogoTablet from "../assets/etsy-tablet.png"
import amazonLogoDesktop from "../assets/amazon-desktop.png"
import ebayLogoDesktop from "../assets/ebay-desktop.png"
import etsyLogoDesktop from "../assets/etsy-desktop.png"
import landingImages from "../assets/landingImages.js"
import search from "../assets/search.png"
import searchTablet from "../assets/search-tablet.png"
import rightArrow from "../assets/right-arrow.png"
import rightArrow2 from "../assets/right-arrow-2.png"
import testimonialOne from "../assets/testimonial-1.jpg"
import testimonialTablet from "../assets/testimonial-tablet.jpg"
import testimonialDesktop from "../assets/testimonial-desktop.jpg"
import {useMediaQuery} from "react-responsive"

const LandingPage = (props) => {

    /////////////////////////////
    // Constants
    /////////////////////////////
    
    const { setProcessFlow, handleContinue } = props

    const isTablet = useMediaQuery({query: '(min-width: 768px)'})
    const isDesktop = useMediaQuery({query: '(min-width: 1024px)'})


    /////////////////////////////
    // Functions
    /////////////////////////////


    const selectionArray = []
    let counter = 0
    while (counter < 5) {
        const selection = Math.floor(Math.random() * landingImages.length)
        if (!selectionArray.includes(selection)) {
            selectionArray.push(selection)
            counter += 1
        }
    }

    /////////////////////////////
    // Render
    /////////////////////////////

    useEffect(() => {
        setProcessFlow({
            keywords: false,
            budget: false
        })
    }, [])

    return (
        <div 
            className="landing-cont"
            key="landing-cont-1"
        >
            <div className="top-background">
                <div className="landing-page-cont">
                    <h1 className="hero">Find a glorious gift in just a few clicks!</h1>
                    <div className="carousel-cont">
                        <Carousel slide={false} fade={false}>
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
                    {!isTablet && <p>Find the best products from your favorite marketplaces.</p>}
                    {isTablet && <p className="tablet-subtext">We search the best products from your favorite marketplaces</p>}
                    {!isTablet && <div className="markets-cont">
                        <img src={amazonLogo} alt="Amazon logo" />
                        <img src={ebayLogo} alt="eBay logo" />
                        <img src={etsyLogo} alt="Etsy logo" />
                    </div>}
                    {(isTablet) && <div className="markets-cont tablet">
                        <img src={amazonLogoTablet} alt="Amazon logo" />
                        <img src={ebayLogoTablet} alt="eBay logo" />
                        <img src={etsyLogoTablet} alt="Etsy logo" />
                    </div>}
                    {/* {isDesktop && <div className="markets-cont desktop">
                        <img src={amazonLogoDesktop} alt="Amazon logo" />
                        <img src={ebayLogoDesktop} alt="eBay logo" />
                        <img src={etsyLogoDesktop} alt="Etsy logo" />
                    </div>} */}
                </div>
            </div>
            <div 
                className="search-cont"
                key="search-cont-div-1"
            >

                <div 
                    className="search"
                    key="search-div"
                >
                    {!isTablet && <img src={search} alt="search icon" />}
                    {isTablet && <img src={searchTablet} alt="search icon" />}
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
                </div>
            </div>
            <div className="explore-banner">
                <h3>Need Some Inspiration?</h3>
            </div>
            <div className="first inspiration-banner">
                <div className="inspiration-img-cont">
                    <img src={landingImages[selectionArray[3]]} alt="generic product" />
                </div>
                <div className="inspiration-subtext-cont">
                    <h5>Gifts for the person who has everything</h5>
                    <a target="_blank" rel="noreferrer" href="https://www.amazon.com/ideas/amzn1.account.AHLYIGXOOI4QZORJIKLAIWSUHZVQ/1LXHHK05VSB6V?&linkCode=ll2&tag=taylorhughe05-20&linkId=f8a3dd099847445c2f4926a3a4e7b7c0&language=en_US&ref_=as_li_ss_tl">
                        <div className="link-cont">
                            <h5>Explore gifts</h5>
                            <img src={rightArrow} alt="right arrow indicating a link to another page" /> 
                        </div>
                    </a>
                </div>
            </div>
            <div className="second inspiration-banner">
                <div className="inspiration-img-cont">
                    <img src={landingImages[selectionArray[4]]} alt="generic product" />
                </div>
                <div className="inspiration-subtext-cont">
                    <h5>Gifts for the bougie people in your life</h5>
                    <a target="_blank" rel="noreferrer" href="https://www.amazon.com/ideas/amzn1.account.AHLYIGXOOI4QZORJIKLAIWSUHZVQ/1LXHHK05VSB6V?&linkCode=ll2&tag=taylorhughe05-20&linkId=f8a3dd099847445c2f4926a3a4e7b7c0&language=en_US&ref_=as_li_ss_tl">
                        <div className="link-cont">
                            <h5>Explore gifts</h5>
                            <img src={rightArrow2} alt="right arrow indicating a link to another page" /> 
                        </div>
                    </a>
                </div>
            </div>
            <div className="third inspiration-banner">
                <div className="inspiration-img-cont">
                    {!isTablet && <img src={testimonialOne} alt="generic product" />}
                    {(isTablet && !isDesktop) && <img src={testimonialTablet} alt="generic product" />}
                    {isDesktop && <img src={testimonialDesktop} alt="generic product" />}
                </div>
                <div className="testimonial-cont">
                    <p><span>I thought Mother’s Day was next weekend! Thank Odin I found Gifthalla. Mom loves the lavender candle and Poo-Pourri.</span></p>
                    <div className="testimonial-author">
                        <p className="bold">Sam Nusbaum</p>
                        <p>Real Gifthalla User</p>
                    </div>
                </div>
            </div>
            <div className="footer-image">
                <Jumbotron fluid>
                    <Container>
                        <h2>Your quest for an awesome gift is over!</h2>
                    </Container>
                    {isTablet && <div className="markets-cont bottom">
                        <img src={amazonLogoTablet} alt="Amazon logo" />
                        <img src={ebayLogoTablet} alt="eBay logo" />
                        <img src={etsyLogoTablet} alt="Etsy logo" />
                    </div>}
                </Jumbotron>
            </div>
            <div 
                className="search-title"
                onClick={handleContinue}
            >
                <h2>SEARCH GIFTS</h2>
            </div>
            <footer>
                <p>Designed By Funky Fresh Design  |  &copy; Gifthalla, LLC</p>
                {isTablet && <p> | </p>}
                <p>All Rights Reserved</p>
            </footer>
        </div>

    )
}

export default LandingPage