import getProducts from "./getProducts.js"
import processSearch from "./processSearch"


// Comment this out if you want to turn off demo mode
// import coffeeData from "../data/coffeeData.js"
// import coffeeHikingData from "../data/coffeeHikingData.js"
// import hikingData from "../data/hikingData.js"
// import starWarsCoffeeData from "../data/starWarsCoffeeData.js"
// import starWarsCoffeeHikingData from "../data/starWarsCoffeeHikingData.js"
// import starWarsData from "../data/starWarsData.js"
// import starWarsHikingData from "../data/starWarsHikingData.js"

const processKeywords = async (keyword1, keyword2, keyword3) => {
    //This splits the keyword text into the comma separated array
      let keywordSplit = [keyword1, keyword2, keyword3]
      keywordSplit = keywordSplit.filter((item, index) => {
        return (
          item !== ""
        )
      })

   
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
    const processedResults = processSearch(searchResults)
    
    return {
        keywordSplit,
        processedResults
    }
}

export default processKeywords