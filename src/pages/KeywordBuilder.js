import React from "react"
import {Link} from "react-router-dom"
import ProductCarousel from "../components/ProductCarousel"

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
        if (event.nativeEvent.data === ",") {
            let person = {
                ...props.person,
                keywordText: event.target.value,
                keywords: keywordSplit
            }
            props.setPerson(person)
        } else {
            let person = {
                ...props.person,
                keywordText: event.target.value
            }
            props.setPerson(person)
        }


    }
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
            </form>
            <ProductCarousel />
            <Link to="/finalcart">
                <button>Finalize Cart</button>
            </Link>
        </div>
    )
}

export default KeywordBuilder