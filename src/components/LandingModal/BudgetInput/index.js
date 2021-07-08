import React, {useState} from "react"
import processKeywords from "../../../functions/processKeywords"
import {withRouter} from "react-router-dom"
import "./styles.css"


function BudgetInput (props) {
    const {person, setPerson, setProcessFlow, processFlow, setResultsBank} = props
    
    /////////////////////////
    // Constants
    /////////////////////////

    const [budget, setBudget] = useState(person.budget)
    const [notifyCustomer, setNotifyCustomer] = useState(false)
    
    /////////////////////////
    // Functions
    /////////////////////////

    const handleBudgetChange = (event) => {
        setBudget(event.target.value)
    }

    const handleContinue = async (event) => {
        event.preventDefault()
        if (budget !== 0 && budget !== "") {

            setProcessFlow({
                ...processFlow,
                budget: true
            })
            const processedObject = await processKeywords(person.keywordText1, person.keywordText2, person.keywordText3)
            setPerson({
                ...person,
                budget: budget,
                keywords: processedObject.keywordSplit
            })

            setResultsBank(processedObject.processedResults)
            
            props.history.push({
                pathname: '/giftsearch',
                state: {searchResults: processedObject}
            })
        } else {
            setNotifyCustomer(true)
        }

    }

    const handleBack = () => {
        setProcessFlow({
            keywords: false
        })
    }
    
    /////////////////////////
    // Render
    /////////////////////////


    
    return (
        <>
            <h4>How much can you afford to spend? You can select multiple products to fit within your budget.</h4>
            {notifyCustomer && <p className="alert">Please input a budget amount.</p>}
            <form
                key="form-2"
                onSubmit={handleContinue}
                className="budget-form"
            >
                <input 
                    type="number"
                    placeholder="$75"
                    name="budget"
                    value={budget}
                    onChange={handleBudgetChange}
                    key="5"
                ></input>
                <div className="buttons">
                    <input
                        type="submit"
                        value="Finish Search"
                        key="6"
                    ></input>
                    <input
                        type="button"
                        value="Back"
                        key="7"
                        onClick={handleBack}
                    ></input>
                </div>
            </form>
        </>
    )
}

export default withRouter(BudgetInput)