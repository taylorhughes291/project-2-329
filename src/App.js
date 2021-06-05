import './App.css';
import Nav from "./components/Nav"
import KeywordBuilder from "./pages/KeywordBuilder"
import FinalCart from "./pages/FinalCart"
import {Route, Switch, withRouter} from "react-router-dom"
import {useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import LandingPage from "./pages/LandingPage"

function App(props) {
  ////////////////////////
  // Constants
  ////////////////////////

  // initialize state to capture person profile

  const [person, setPerson] = useState({
    name: "",
    budget: "",
    keywords: [],
    keywordText1: "",
    keywordText2: "",
    keywordText3: "",
    selectedProducts: [],
    searched: false
  })

  const [productSearch, setProductSearch] = useState({
    productDisplay: [],
    displayBank: []
  })
  
  ////////////////////////
  // Functions
  ////////////////////////

  const handleReset = () => {
    setPerson({
      name: "",
      budget: "",
      keywords: [],
      keywordText: "",
      selectedProducts: []
    })
    setProductSearch([])
  }

  // The following function handles changes the user inputs to the Keyword Field.
  //    It also doesn't allow the user to type in more than 3 keywords.
  const handleKeywordChange1 = (event) => {
    let newPerson = {
        ...person,
        keywordText1: event.target.value
    }
    setPerson(newPerson)
  }
  const handleKeywordChange2 = (event) => {
    let newPerson = {
        ...person,
        keywordText2: event.target.value
    }
    setPerson(newPerson)
  }
  const handleKeywordChange3 = (event) => {
    let newPerson = {
        ...person,
        keywordText3: event.target.value
    }
    setPerson(newPerson)
  }

  // The following function handles updates when the user changes the Budget field.
  const handleBudgetChange = (event) => {
    let newPerson = {
        ...person,
        budget: parseFloat(event.target.value)
    }
    setPerson(newPerson)
  }
  ////////////////////////
  // Render
  ////////////////////////

  return (
    <div className="App">
      <Nav 
        handleReset={handleReset}
      />
      <Switch>
        <Route
          exact path="/"
        >
          <LandingPage
            person={person}
            handleKeywordChange1={handleKeywordChange1}
            handleKeywordChange2={handleKeywordChange2}
            handleKeywordChange3={handleKeywordChange3}
            handleBudgetChange={handleBudgetChange}
          />
        </Route>
        <Route path="/giftsearch">
          <KeywordBuilder 
            person={person}
            setPerson={setPerson}
            productSearch={productSearch}
            setProductSearch={setProductSearch}
            handleKeywordChange1={handleKeywordChange1}
            handleKeywordChange2={handleKeywordChange2}
            handleKeywordChange3={handleKeywordChange3}
            handleBudgetChange={handleBudgetChange}
          />
        </Route>
        <Route path="/finalcart">
          <FinalCart 
            person={person}
            setPerson={setPerson}
            productSearch={productSearch}
            setProductSearch={setProductSearch}
          />
        </Route>
      </Switch>
      
    </div>
  );
}

export default withRouter(App);
