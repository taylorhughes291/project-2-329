import React, {useState} from "react"
import {Link} from "react-router-dom"
import ProductCarousel from "../components/ProductCarousel"

const KeywordBuilder = (props) => {
  ////////////////////////
  // Constants
  ////////////////////////

  const [productSearch, setProductSearch] = useState(null)

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
    const url = `https://api.rainforestapi.com/request?api_key=${apiKey}&type=search&amazon_domain=amazon.com&search_term=${searchTerm}`
    const response = await fetch(url)
    const data=response.json()
  }

  const handleClick = (rawKeywords) => {
      const keywordSplit = rawKeywords.split(",", 3)
      const person = {
          ...props.person,
          keywords: keywordSplit
      }
      props.setPerson(person)

      const searchTerms = []
      console.log(props.person.keywords[0]);
      for (let i = 0; i < props.person.keywords.length; i += 1) {
        console.log(i);
          //At the end of your project make sure you swap the API URLs out for this
          for (let j = i; j < props.person.keywords.length; j += 1) {
            console.log(j);
            if (i === j) {
                searchTerms.push(props.person.keywords[i])
            } else {
                searchTerms.push(`${props.person.keywords[i]} ${props.person.keywords[j]}`)
            }
            if (j - i === props.person.keywords.length - 1) {
                let array = []
                for (let k = i; k < props.person.keywords.length; k += 1) {
                    array.push(props.person.keywords[k])
                }
                array = array.join(" ")
                searchTerms.push(array)
            }

          }
      }
      console.log(searchTerms)
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
            <ProductCarousel />
            <Link to="/finalcart">
                <button>Finalize Cart</button>
            </Link>
        </div>
    )
}

export default KeywordBuilder