import React, {useEffect} from "react"
import {Link} from "react-router-dom"
import ProductCarousel from "../components/ProductCarousel"
import ranking from "../functions/ranking.js"
import {useMediaQuery} from "react-responsive"
import priceFilter from "../functions/priceFilter.js"
import cart from "../assets/cart.png"


const KeywordBuilder = (props) => {
  ////////////////////////
  // Constants
  ////////////////////////
  const {setModalShow, processFlow, setProcessFlow, productSearch, setProductSearch, resultsBank, setResultsBank} = props

 

  const isTablet = useMediaQuery({query: '(min-width: 768px)'})
  const isDesktop = useMediaQuery({query: '(min-width: 961px)'})
  let numberResults = 5
  if (isTablet && !isDesktop) {
    numberResults = 8
  } else if (isDesktop) {
    numberResults = 12
  }


  //The following state will keep track of the remaining products in the case that you want to add more
  //     if the user so desires. This array will get filled in the handleClick function below.
 

  ////////////////////////
  // Functions
  ////////////////////////

  // Need to have a sum total of selected items.
  const sumTotal = () => {
    let sum = 0
    for (const obj of props.person.selectedProducts) {
        sum = sum + obj.price.value
    }
    return parseFloat(Math.trunc(sum*100)/100).toFixed(2)
  }

  //Invoking this function will enable the user to see more products than what is displayed. It is invoked both
  //    in the initial product search, where numberOfProducts is passed depending on the device size.
  //    It is invoked again when the user clicks "See More Products" at the bottom of the page, after initial 
  //    device loading.
  const handleSeeMore = (numberOfProducts, results, isSearch) => {
    const newDisplayBank = results.slice()
    const newProductSearch = productSearch.productDisplay.concat(newDisplayBank.splice(0, numberOfProducts))
    setProductSearch(
      {
        productDisplay: isSearch ? results.slice(0, numberOfProducts) : newProductSearch,
        displayBank: newDisplayBank
      }
    )
  }

  const handleStates = (bank) => {
    const filteredResults = priceFilter(bank, props.person.budget - sumTotal())
    const rankedResults = ranking(filteredResults, props.person.budget, props.person.keywords)
    
    //displayResults is what we want to show, but resultsBank has the rest if the user wishes to see more
    // I am going to make the number of results dynamic upon which device is being used. Note that
    //      numberResults is a variable declared in the above constants section depending on the size of 
    //      the screen using media queries from react-responsive
    // Note that I have to call this callback function in order for state to set properly.
    handleSeeMore(numberResults, rankedResults, true)
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

  const handleProcessReset = () => {
    setProcessFlow({
      keywords: false,
      budget: false
    })
  }


  ////////////////////////
  // Render
  ////////////////////////

  useEffect(() => {
    window.scrollTo(0, 0)
    handleStates(resultsBank)
  }, [resultsBank])

  useEffect(() => {
    if (processFlow.budget) {
        setModalShow(false)
    }
  }, [processFlow.budget])

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
              <div className="data-cont">
                <Link to="/finalcart">
                  <img 
                    onClick={handleProcessReset}
                    src={cart} alt="cart icon" />
                </Link>
              </div>
            </div>
          </div>
            <ProductCarousel 
                data={productSearch}
                setProductSearch={setProductSearch}
                person={props.person}
                setPerson={props.setPerson}
                handleSeeMore={handleSeeMore}
                resultsBank={resultsBank}
                setResultsBank={setResultsBank}
                sumTotal={sumTotal}
            />
        </div>
    )
}

export default KeywordBuilder