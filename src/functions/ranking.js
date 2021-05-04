import coffeeData from "../data/coffeeData.js"
import coffeeHikingData from "../data/coffeeHikingData.js"
import hikingData from "../data/hikingData.js"
import starWarsCoffeeData from "../data/starWarsCoffeeData.js"
import starWarsCoffeeHikingData from "../data/starWarsCoffeeHikingData.js"
import starWarsData from "../data/starWarsData.js"
import starWarsHikingData from "../data/starWarsHikingData.js"

let searchResults = []
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

const budget = 50


const ranking = (arr, cost) => {
    const newArr = arr.map((item, index) => {
        return (
            item.filter((item, index) => {
                console.log(item.price && item.price.value <= cost, index);
                return (
                    item.price && item.price.value <= cost
                )
            })
        )
    })
    return newArr
}

searchResults = ranking(searchResults, budget)