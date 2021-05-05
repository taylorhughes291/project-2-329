import React, {useState} from "react"
import {Link} from "react-router-dom"
import ProductCarousel from "../components/ProductCarousel"
import ranking from "../functions/ranking.js"

import coffeeData from "../data/coffeeData"
import coffeeHikingData from "../data/coffeeHikingData"
import hikingData from "../data/hikingData"
import starWarsCoffeeData from "../data/starWarsCoffeeData"
import starWarsCoffeeHikingData from "../data/starWarsCoffeeHikingData"
import starWarsData from "../data/starWarsData"
import starWarsHikingData from "../data/starWarsHikingData"

const KeywordBuilder = (props) => {
  ////////////////////////
  // Constants
  ////////////////////////

  

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

  const handleClick = async (rawKeywords) => {
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

    // The below is for sending an API request for all search terms to Rainforest API Product Search
    // Please only activate this when you're ready to go live.

    const searchResults = []
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
    const resultsBank = ranking(searchResults, props.person.budget, keywordSplit)
    
    //displayResults is what we want to show, but resultsBank has the rest if the user wishes to see more
    const displayResults = resultsBank.splice(0, 10)

    //Need to create a data point for all display results to toggle selected and deselected
    for (const obj of displayResults) {
        obj.selected = false
    }

    //set the Product search state with what you wish to display
    props.setProductSearch(displayResults)
  }

  ////////////////////////
  // Render
  ////////////////////////

    return (
        <div>
            <form>
                <input 
                    type="text" 
                    placeholder="Person"
                    value={props.person.name}
                    onChange={handleNameChange}
                ></input>
                <input 
                    type="number" 
                    placeholder="Budget"
                    value={props.person.budget}
                    onChange={handleBudgetChange}
                ></input>
                <input 
                    type="text" 
                    placeholder="Keywords"
                    value={props.person.keywordText}
                    onChange={handleKeywordChange}
                ></input>
                <button 
                    type="button"
                    onClick={() => handleClick(props.person.keywordText)}
                >Search Products</button>
            </form>
            <ProductCarousel 
                data={props.productSearch}
                setProductSearch={props.setProductSearch}
                person={props.person}
                setPerson={props.setPerson}
            />
            <Link to="/finalcart">
                <button>Finalize Cart</button>
            </Link>
        </div>
    )
}

export default KeywordBuilder