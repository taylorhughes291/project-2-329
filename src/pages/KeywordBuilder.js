import React, {useState} from "react"
import {Link} from "react-router-dom"
import ProductCarousel from "../components/ProductCarousel"
import ranking from "../functions/ranking.js"
import {useMediaQuery} from "react-responsive"
import {Modal, Button} from "react-bootstrap"
import priceFilter from "../functions/priceFilter.js"
import processSearch from "../functions/processSearch.js"

// Comment this out if you want to turn off demo mode
import coffeeData from "../data/coffeeData.js"
import coffeeHikingData from "../data/coffeeHikingData.js"
import hikingData from "../data/hikingData.js"
import starWarsCoffeeData from "../data/starWarsCoffeeData.js"
import starWarsCoffeeHikingData from "../data/starWarsCoffeeHikingData.js"
import starWarsData from "../data/starWarsData.js"
import starWarsHikingData from "../data/starWarsHikingData.js"

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

  //The following state will keep track of the remaining products in the case that you want to add more
  //     if the user so desires. This array will get filled in the handleClick function below.
  const [resultsBank, setResultsBank] = useState([])

  ////////////////////////
  // Functions
  ////////////////////////

  // The following function handles updating State when the user changes the Gift Recipient field.
  const handleNameChange = (event) => {
    let person = {
        ...props.person,
        name: event.target.value
    }
    props.setPerson(person)
  }

  // The following function handles updates when the user changes the Budget field.
  const handleBudgetChange = (event) => {
    let person = {
        ...props.person,
        budget: parseFloat(event.target.value)
    }
    props.setPerson(person)
  }

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

  // This function handles the API call to Rainforest.
  const getProducts = async (searchTerm) => {
    const apiKey = process.env.REACT_APP_RAINFOREST_API_KEY
    const associateId = "taylorhughe05-20"
    const url = `https://api.rainforestapi.com/request?api_key=${apiKey}&type=search&amazon_domain=amazon.com&associate_id=${associateId}&search_term=${searchTerm}`
    
    const response = await fetch(url)
    const data = await response.json()
    return data.search_results
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
    const isReadyToSearch = props.person.budget !== "" && props.person.name !== "" && (props.person.keywordText1 !== "" || props.person.keywordText2 !== ""  || props.person.keywordText3 !== "" )
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
            <Modal.Header>
              <Modal.Title>Your Gift Recommendations are Loading!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Give us a few more seconds to help you find the perfect gift. It could take us a minute to think of something great!
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

      //This splits the keyword text into the comma separated array
      let keywordSplit = [keyword1, keyword2, keyword3]
      keywordSplit = keywordSplit.filter((item, index) => {
        return (
          item !== ""
        )
      })
      const person = {
          ...props.person,
          keywords: keywordSplit,
          searched: true
      }
      props.setPerson(person)
   
    // The below is for generating every combination of search terms from the user input.
    let searchTerms = []
    for (let i = 0; i < keywordSplit.length; i += 1) {
        for (let j = i; j < keywordSplit.length; j += 1) {
            if (i === j) {
                searchTerms.push(keywordSplit[i])
            } else {
                searchTerms.push(`${keywordSplit[i]} ${keywordSplit[j]}`)
            }
            if (j - i === keywordSplit.length - 1) {
                let array = []
                for (let k = i; k < keywordSplit.length; k += 1) {
                    array.push(keywordSplit[k])
                }
                array = array.join(" ")
                searchTerms.push(array)
            }
        }
    }

    // Please note that the below was adopted from https://dev.to/clairecodes/how-to-create-an-array-of-unique-values-in-javascript-using-sets-5dg6
    // The below creates only unique values of searchTerms
    searchTerms = [...new Set(searchTerms)]

    // This array will contain all of your API response data.
    const searchResults = []

    // The below is for sending an API request for all search terms to Rainforest API Product Search
    // Please only activate this when you're ready to go live.

    
    // for (const search of searchTerms) {
    //     searchResults.push(await getProducts(search))
    // }

    // The below is for the purposes of development only, and should be switched back to the code above when you are ready to present.
    const coffee = coffeeData
    searchResults.push(coffee.search_results)
    const coffeeHiking = coffeeHikingData
    searchResults.push(coffeeHiking.search_results)
    const hiking = hikingData
    searchResults.push(hiking.search_results)
    const starWarsCoffee = starWarsCoffeeData
    searchResults.push(starWarsCoffee.search_results)
    const starWarsCoffeeHiking = starWarsCoffeeHikingData
    searchResults.push(starWarsCoffeeHiking.search_results)
    const starWars = starWarsData
    searchResults.push(starWars.search_results)
    const starWarsHiking = starWarsHikingData
    searchResults.push(starWarsHiking.search_results)
    
    //Invoke function from ranking.js to distill which products to display
    const processedResults = processSearch(searchResults)
    setResultsBank(
      processedResults
    )
    const filteredResults = priceFilter(processedResults, props.person.budget)
    const rankedResults = ranking(filteredResults, props.person.budget, keywordSplit)



    
    //displayResults is what we want to show, but resultsBank has the rest if the user wishes to see more
    // I am going to make the number of results dynamic upon which device is being used. Note that
    //      numberResults is a variable declared in the above constants section depending on the size of 
    //      the screen using media queries from react-responsive
    // Note that I have to call this callback function in order for state to set properly.
    handleSeeMore(numberResults, rankedResults)


     //You may now take down the loading state
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

    return (
        <div className="keyword-cont">
          <div className={props.person.searched ? "completed-form" : "completed-form hidden"}>
            <h5>Recipient: {props.person.name}</h5>
            <h5
              className={sumTotal() > props.person.budget ? "sum-total over" : "sum-total"}
            >Budget: ${sumTotal()} / ${props.person.budget}</h5>
            <h5>Keywords: {props.person.keywordText1} {props.person.keywordText2 && ` / ${props.person.keywordText2}`}{props.person.keywordText3 && ` / ${props.person.keywordText3}`}</h5>
            <button
              onClick={handleEdit}
            >Edit</button>
          </div>
            <form
              className={props.person.searched ? "hidden" : ""}
            >
                <h5>Gift Recipient:</h5>
                <input 
                    type="text" 
                    placeholder="Tiny Tim"
                    value={props.person.name}
                    onChange={handleNameChange}
                ></input>
                <h5>Budget:</h5>
                <span className={isFilled ? "dollar-filled" : "dollar"}>$</span>
                <input 
                    type="number"
                    className="budget"
                    placeholder="75"
                    value={props.person.budget}
                    onChange={handleBudgetChange}
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