import React, {useState, useEffect} from "react"
import {Link, useLocation} from "react-router-dom"
import ProductCarousel from "../components/ProductCarousel"
import ranking from "../functions/ranking.js"
import {useMediaQuery} from "react-responsive"
import {Modal, Button} from "react-bootstrap"
import priceFilter from "../functions/priceFilter.js"
import processKeywords from "../functions/processKeywords"
import ship from "../assets/ship.png"
import cart from "../assets/cart.png"


const KeywordBuilder = (props) => {
  ////////////////////////
  // Constants
  ////////////////////////

  const isTablet = useMediaQuery({query: '(min-width: 768px)'})
  const isDesktop = useMediaQuery({query: '(min-width: 961px)'})
  let numberResults = 5
  if (isTablet && !isDesktop) {
    numberResults = 8
  } else if (isDesktop) {
    numberResults = 12
  }

  let isFilled = false
  if (props.person.budget !== "") {
    isFilled = true
  }

  const landingPageResults = useLocation()
  console.log(landingPageResults);

  //The following state will keep track of the remaining products in the case that you want to add more
  //     if the user so desires. This array will get filled in the handleClick function below.
  const [resultsBank, setResultsBank] = useState([])

  ////////////////////////
  // Functions
  ////////////////////////

  //Invoking this function will enable the user to see more products than what is displayed. It is invoked both
  //    in the initial product search, where numberOfProducts is passed depending on the device size.
  //    It is invoked again when the user clicks "See More Products" at the bottom of the page, after initial 
  //    device loading.
  const handleSeeMore = (numberOfProducts, results) => {
      const newProductSearch = props.productSearch.productDisplay.concat(results.slice(0, numberOfProducts))
      const newDisplayBank = results
      newDisplayBank.splice(0, numberOfProducts)
    props.setProductSearch(
      {
        productDisplay: newProductSearch,
        displayBank: newDisplayBank
      }
    )
  }

  // The following code is adopted from React-bootstrap in order to render a Modal so that the customer
  //    knows that their content is loading! It creates the Modal and the button that must be clicked
  //    for the modal to pop up, which is rendered down below in the "Render" area
  //    - This function also checks to make sure that the form is all filled out before searching.
  //        - The purpose of this is so the user makes the most robust search possible and doesn't waste an API call.

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function LoadingModal() {
    const isReadyToSearch = props.person.budget !== "" && (props.person.keywordText1 !== "" || props.person.keywordText2 !== ""  || props.person.keywordText3 !== "" )
    return (
      <>
        <Button onClick={isReadyToSearch ? () => handleClick(props.person.keywordText1, props.person.keywordText2, props.person.keywordText3) : () => handleShow()}>
          Search for Gifts
        </Button>
  
        {isReadyToSearch && <>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Body>
              <h2>SUCCESS!</h2>
              <img src={ship} alt="ship loading icon" />
              <p>One moment while we gather your search results...</p>
            </Modal.Body>
          </Modal>
        </>}

        {!isReadyToSearch && <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Please make sure all fields are entered</Modal.Title>
            </Modal.Header>
            <Modal.Body>You're so close to great gift recommendations, just a few more fields to fill out!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>}
      </>
    );
  }

  const handleStates = (processedObject) => {
    const person = {
      ...props.person,
      keywords: processedObject.keywordSplit,
      searched: true
    }
    props.setPerson(person)
    setResultsBank(
      processedObject.processedResults
    )
    const filteredResults = priceFilter(processedObject.processedResults, props.person.budget)
    const rankedResults = ranking(filteredResults, props.person.budget, processedObject.keywordSplit)
    //displayResults is what we want to show, but resultsBank has the rest if the user wishes to see more
    // I am going to make the number of results dynamic upon which device is being used. Note that
    //      numberResults is a variable declared in the above constants section depending on the size of 
    //      the screen using media queries from react-responsive
    // Note that I have to call this callback function in order for state to set properly.
    handleSeeMore(numberResults, rankedResults)
  }

// This function is pretty huge. This function:
//    - Invokes the function that forces the modal to pop up, which doesn't allow the user to navigate away
//        or try to click the product search button again thinking that it didn't work
//    - Splits the keywords by commas and then updates person state with an array of their keywords
//    - Generates a new array that contains every single possible combination of the keywords to search
//        - Only preserves unique values of that keyword combination
//    - Sends a request to the API for each search term combination
//    - Calls a separate "ranking" function in order to try and rank the search results by most relevant
//    - Takes those results and separates them into what will be displayed, and what results will be in the "bank"
//        to be viewed later if the user wishes to see more
  const handleClick = async (keyword1, keyword2, keyword3) => {
    // You now want to initiate the loading state, so that the customer doesn't attempt to call the API
    //    again or think it's not working
    handleShow();    
    const processedObject = await processKeywords(keyword1, keyword2, keyword3)
    handleStates(processedObject)

    handleClose()
  }

  // Need to have a sum total of selected items.
  const sumTotal = () => {
    let sum = 0
    for (const obj of props.person.selectedProducts) {
        sum = sum + obj.price
    }
    return parseFloat(Math.trunc(sum*100)/100).toFixed(2)
  }

  const handleEdit = () => {
    const person = {
      ...props.person,
      searched: false
    }
    props.setPerson(person)
  }

  ////////////////////////
  // Render
  ////////////////////////

  useEffect(() => {
    if (landingPageResults.state) {
      handleStates(landingPageResults.state.searchResults)
    } else {
      return null
    }
  }, [])

    return (
        <div className="keyword-cont">
          <div className={props.person.searched ? "completed-form" : "completed-form hidden"}>
            <div className="keywords-cont">
              <div className="keyword-cont"><h5>{props.person.keywordText1}</h5></div>
              <div className="keyword-cont"><h5>{props.person.keywordText2}</h5></div>
              <div className="keyword-cont"><h5>{props.person.keywordText3}</h5></div>
            </div>
            <div className="datas-cont">
              <div className="data-cont">
                <h4>Sort</h4>
                <i class="fas fa-chevron-down"></i>
              </div>
              <div className="data-cont"><h4 className={sumTotal() > props.person.budget ? "sum-total over" : "sum-total"}>${sumTotal()} / ${props.person.budget}</h4></div>
              <div className="data-cont"><img src={cart} alt="cart icon" /></div>
            </div>
          </div>
            <form
              className={props.person.searched ? "hidden" : ""}
            >
                <h5>Budget:</h5>
                <span className={isFilled ? "dollar-filled" : "dollar"}>$</span>
                <input 
                    type="number"
                    className="budget"
                    placeholder="75"
                    value={props.person.budget}
                    onChange={props.handleBudgetChange}
                ></input>
                <h5>Enter up to 3 Keywords below:</h5>
                <div className="keywords">
                  <input 
                      type="text"
                      className="keyword"
                      placeholder="Coffee"
                      value={props.person.keywordText1}
                      onChange={props.handleKeywordChange1}
                  ></input>
                  <input 
                      type="text" 
                      className="keyword"
                      placeholder="Star Wars"
                      value={props.person.keywordText2}
                      onChange={props.handleKeywordChange2}
                  ></input>
                  <input 
                      type="text" 
                      className="keyword"
                      placeholder="Succulents"
                      value={props.person.keywordText3}
                      onChange={props.handleKeywordChange3}
                  ></input>
                </div>
                <LoadingModal /> 
            </form>
            <ProductCarousel 
                data={props.productSearch}
                setProductSearch={props.setProductSearch}
                person={props.person}
                setPerson={props.setPerson}
                handleSeeMore={handleSeeMore}
                resultsBank={resultsBank}
                setResultsBank={setResultsBank}
                sumTotal={sumTotal}
            />
            <Link to="/finalcart">
                <button className="finalize btn btn-primary">Finalize Cart</button>
            </Link>
        </div>
    )
}

export default KeywordBuilder