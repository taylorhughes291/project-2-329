import React, {useState} from "react"
import {Link} from "react-router-dom"
import ProductCarousel from "../components/ProductCarousel"
import ranking from "../functions/ranking.js"
import {useMediaQuery} from "react-responsive"
import {Modal, Button} from "react-bootstrap"

// Comment this out if you want to turn off demo mode
// import coffeeData from "../data/coffeeData.js"
// import coffeeHikingData from "../data/coffeeHikingData.js"
// import hikingData from "../data/hikingData.js"
// import starWarsCoffeeData from "../data/starWarsCoffeeData.js"
// import starWarsCoffeeHikingData from "../data/starWarsCoffeeHikingData.js"
// import starWarsData from "../data/starWarsData.js"
// import starWarsHikingData from "../data/starWarsHikingData.js"

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

  const handleNameChange = (event) => {
    let person = {
        ...props.person,
        name: event.target.value
    }
    props.setPerson(person)
  }

  const handleBudgetChange = (event) => {
    let person = {
        ...props.person,
        budget: event.target.value
    }
    props.setPerson(person)
  }

  //Invoking this function will enable the user to see more products than what is displayed.
  const handleSeeMore = (numberOfProducts, results) => {
      const newProductSearch = props.productSearch.concat(results.slice(0, numberOfProducts))
    props.setProductSearch(
        newProductSearch
    )
    setResultsBank(
        results.slice(numberOfProducts, results.length)
    )
  }


  const handleKeywordChange = (event) => {
    const keywordSplit = props.person.keywordText.split(",")

    if (keywordSplit.length <= 3 || event.nativeEvent.inputType === "deleteContentBackward") {
        let person = {
            ...props.person,
            keywordText: event.target.value
        }
        props.setPerson(person)
        
    }
  }

  const getProducts = async (searchTerm) => {
    const apiKey = "1B2E215619074D408C3A9E1D5AC8F372"
    const associateId = "taylorhughe05-20"
    const url = `https://api.rainforestapi.com/request?api_key=${apiKey}&type=search&amazon_domain=amazon.com&associate_id=${associateId}&search_term=${searchTerm}`
    
    const response = await fetch(url)
    const data = await response.json()
    return data.search_results
  }

  // The following code is adopted from React-bootstrap in order to render a Modal so that the customer
  //    knows that their content is loading!

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function LoadingModal() {
    return (
      <>
        <Button onClick={() => handleClick(props.person.keywordText)}>
          Search for Gifts
        </Button>
  
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
            Give us a few more seconds to help you find the perfect gift
          </Modal.Body>

        </Modal>
      </>
    );
  }
  
  

  const handleClick = async (rawKeywords) => {
      // You now want to initiate the loading state, so that the customer doesn't attempt to call the API
      //    again or think it's not working
      handleShow();

      const keywordSplit = rawKeywords.split(",", 3)
      const person = {
          ...props.person,
          keywords: keywordSplit
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
    const searchResults = []

    // The below is for sending an API request for all search terms to Rainforest API Product Search
    // Please only activate this when you're ready to go live.

    
    for (const search of searchTerms) {
        searchResults.push(await getProducts(search))
    }

    // The below is for the purposes of development only, and should be switched back to the code above when you are ready to present.
    // const coffee = coffeeData
    // searchResults.push(coffee.search_results)
    // const coffeeHiking = coffeeHikingData
    // searchResults.push(coffeeHiking.search_results)
    // const hiking = hikingData
    // searchResults.push(hiking.search_results)
    // const starWarsCoffee = starWarsCoffeeData
    // searchResults.push(starWarsCoffee.search_results)
    // const starWarsCoffeeHiking = starWarsCoffeeHikingData
    // searchResults.push(starWarsCoffeeHiking.search_results)
    // const starWars = starWarsData
    // searchResults.push(starWars.search_results)
    // const starWarsHiking = starWarsHikingData
    // searchResults.push(starWarsHiking.search_results)
    
    //Invoke function from ranking.js to distill which products to display
    const rankedResults = ranking(searchResults, props.person.budget, keywordSplit)
    // console.log(ranking(searchResults, props.person.budget, keywordSplit))
    // console.log(resultsBank)
    
    //displayResults is what we want to show, but resultsBank has the rest if the user wishes to see more
    // I am going to make the number of results dynamic upon which device is being used. Note that
    //      numberResults is a variable declared in the above constants section depending on the size of 
    //      the screen using media queries from react-responsive
    // Note that I have to call this callback function in order for state to set properly.
    handleSeeMore(numberResults, rankedResults)


     //You may now take down the loading state
    handleClose()
  }

  ////////////////////////
  // Render
  ////////////////////////

    return (
        <div className="keyword-cont">
            <form>
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
                <input 
                    type="text" 
                    placeholder="Coffee, Star Wars, Succulents"
                    value={props.person.keywordText}
                    onChange={handleKeywordChange}
                ></input>
                <LoadingModal /> 
            </form>
            <ProductCarousel 
                data={props.productSearch}
                setProductSearch={props.setProductSearch}
                person={props.person}
                setPerson={props.setPerson}
                handleSeeMore={handleSeeMore}
                resultsBank={resultsBank}
            />
            <Link to="/finalcart">
                <button className="finalize btn btn-primary">Finalize Cart</button>
            </Link>
        </div>
    )
}

export default KeywordBuilder