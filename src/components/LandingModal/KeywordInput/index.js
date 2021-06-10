import React, {useState, useContext} from "react"
import {setPersonContext} from "../../../App"
import "./styles.css"


function KeywordInput ({person, setProcessFlow, processFlow}) {
    
    /////////////////////////
    // Constants
    /////////////////////////

    const [keywords, setKeywords] = useState({
        keywordText1: person.keywordText1,
        keywordText2: person.keywordText2,
        keywordText3: person.keywordText3,
    })
    const [notifyCustomer, setNotifyCustomer] = useState(false)

    const personContext = useContext(setPersonContext)
    const setPerson = personContext.setPerson
    
    /////////////////////////
    // Functions
    /////////////////////////

    const handleKeywordChange = (event) => {
        setKeywords({
            ...keywords,
            [event.target.name]: event.target.value
        })
    }

    const handleContinue = (event) => {
        event.preventDefault()
        if (keywords.keywordText1 !== "" || keywords.keywordText2 !== "" || keywords.keywordText3 !== "") {
            setProcessFlow({
                ...processFlow,
                keywords: true
            })
            setPerson({
                ...person,
                ...keywords
            })
            setNotifyCustomer(false)
        } else {
            setNotifyCustomer(true)
        }

    }
    
    /////////////////////////
    // Render
    /////////////////////////
    
    return (
        <>
            <h4>Our search results are based on keywords. Just tell us three things your giftee likes!</h4>
            {notifyCustomer && <p className="alert">Please input at least one option below.</p>}
            <form
                onSubmit={handleContinue}
                key="keyword-modal-text"
                className="keyword-form"
            >
                <input 
                    type="text"
                    name="keywordText1"
                    placeholder="Coffee"
                    value={keywords.keywordText1}
                    onChange={handleKeywordChange}
                    key="1"
                ></input>
                <input 
                    type="text"
                    name="keywordText2"
                    placeholder="Star Wars"
                    value={keywords.keywordText2}
                    onChange={handleKeywordChange}
                    key="2"
                ></input>
                <input 
                    type="text"
                    name="keywordText3"
                    placeholder="Succulents"
                    value={keywords.keywordText3}
                    onChange={handleKeywordChange}
                    key="3"
                ></input>
                <input 
                    type="submit" 
                    value="CONTINUE"
                    key="4"
                ></input>
            </form>
        </>
    )
}

export default KeywordInput