import React, {useState, useEffect} from "react"
import {Link, useLocation} from "react-router-dom"
import ProductCarousel from "../components/ProductCarousel"
import ranking from "../functions/ranking.js"
import {useMediaQuery} from "react-responsive"
import priceFilter from "../functions/priceFilter.js"
import cart from "../assets/cart.png"
import LandingModal from "../components/LandingModal"


const KeywordBuilder = (props) => {
  ////////////////////////
  // Constants
  ////////////////////////

  const [modalShow, setModalShow] = useState(false);
  const [processFlow, setProcessFlow] = useState({
      keywords: false,
      budget: false
  })

  const isTablet = useMediaQuery({query: '(min-width: 768px)'})
  const isDesktop = useMediaQuery({query: '(min-width: 961px)'})
  let numberResults = 5
  if (isTablet && !isDesktop) {
    numberResults = 8
  } else if (isDesktop) {
    numberResults = 12
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


  // Need to have a sum total of selected items.
  const sumTotal = () => {
    let sum = 0
    for (const obj of props.person.selectedProducts) {
        sum = sum + obj.price
    }
    return parseFloat(Math.trunc(sum*100)/100).toFixed(2)
  }

  const handleEdit = (name) => {
    if (name === "keywords") {
      setProcessFlow({
        keywords: false,
        budget: false
      })
    } else if (name === "budget") {
      setProcessFlow({
        keywords: true,
        budget: false
      })
    }
    setModalShow(true)
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
  }, [landingPageResults.state])

    return (
        <div className="keyword-cont">
          <div className="completed-form">
            <div 
              className="keywords-cont"
              onClick={() => handleEdit('keywords')}
            >
              <div className="keyword-cont"><h5>{props.person.keywordText1}</h5></div>
              <div className="keyword-cont"><h5>{props.person.keywordText2}</h5></div>
              <div className="keyword-cont"><h5>{props.person.keywordText3}</h5></div>
            </div>
            <div className="datas-cont">
              <div className="data-cont">
                <h4>Sort</h4>
                <i className="fas fa-chevron-down"></i>
              </div>
              <div className="data-cont" onClick={() => handleEdit("budget")}><h4 className={sumTotal() > props.person.budget ? "sum-total over" : "sum-total"}>${sumTotal()} / ${props.person.budget}</h4></div>
              <div className="data-cont"><img src={cart} alt="cart icon" /></div>
            </div>
          </div>
            <LandingModal
              key="landing-modal-1"
              processFlow={processFlow}
              setProcessFlow={setProcessFlow}
              person={props.person}
              modalShow={modalShow}
              setModalShow={setModalShow}
            />
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