import React, {useState, useContext} from "react"
import {setPersonContext} from "../../../App"



function BudgetInput ({person, setProcessFlow, processFlow}) {
    
    /////////////////////////
    // Constants
    /////////////////////////

    const [budget, setBudget] = useState(person.budget)

    const personContext = useContext(setPersonContext)
    const setPerson = personContext.setPerson
    
    /////////////////////////
    // Functions
    /////////////////////////

    const handleBudgetChange = (event) => {
        setBudget(event.target.value)
    }

    const handleContinue = (event) => {
        event.preventDefault()
        setProcessFlow({
            ...processFlow,
            budget: true
        })
        setPerson({
            ...person,
            budget: budget
        })
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
            <form
                key="form-2"
                onSubmit={handleContinue}
            >
                <input 
                    type="number"
                    placeholder="$75"
                    name="budget"
                    value={budget}
                    onChange={handleBudgetChange}
                    key="5"
                ></input>
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
            </form>
        </>
    )
}

export default BudgetInput