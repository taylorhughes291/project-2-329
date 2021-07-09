import './App.css';
import Nav from "./components/Nav"
import KeywordBuilder from "./pages/KeywordBuilder"
import FinalCart from "./pages/FinalCart"
import {Route, Switch, withRouter} from "react-router-dom"
import {useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import LandingPage from "./pages/LandingPage"
import LandingModal from "./components/LandingModal"


function App(props) {
  ////////////////////////
  // Constants
  ////////////////////////

  // initialize state to capture person profile

  const [person, setPerson] = useState({
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

  const [resultsBank, setResultsBank] = useState([])

  const [processFlow, setProcessFlow] = useState({
    keywords: false,
    budget: false
  })

  const [modalShow, setModalShow] = useState(false);
  
  
  ////////////////////////
  // Functions
  ////////////////////////


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

  const handleContinue = (event) => {
    event.preventDefault()
    if (person.keywordText1 !== "" || person.keywordText2 !== "" || person.keywordText3 !== "") {
        setProcessFlow({
            ...processFlow,
            keywords: true
        })
    }
    if (processFlow.budget) {
      setProcessFlow({
        keywords: false,
        budget: false
    })
    }
    setModalShow(true)
}

  ////////////////////////
  // Render
  ////////////////////////

  return (
    <div 
      className="App"
      key="app"
    >
      <Nav 
        handleContinue={handleContinue}
      />
      <LandingModal
        key="landing-modal-1"
        processFlow={processFlow}
        setProcessFlow={setProcessFlow}
        person={person}
        setPerson={setPerson}
        modalShow={modalShow}
        setModalShow={setModalShow}
        setResultsBank={setResultsBank}
      />
      <Switch
        key="switch-1"
      >
        <Route
          exact path="/"
          key="route-landing-page"
        >
            <LandingPage
              key="landing-page-1"
              setProcessFlow={setProcessFlow}
              handleContinue={handleContinue}
              person={person}
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
              processFlow={processFlow}
              setProcessFlow={setProcessFlow}
              resultsBank={resultsBank}
              setResultsBank={setResultsBank}
              setModalShow={setModalShow}
            />
        </Route>
        <Route path="/finalcart">
          <FinalCart 
            person={person}
            setPerson={setPerson}
            productSearch={productSearch}
            setProductSearch={setProductSearch}
            setResultsBank={setResultsBank}
            resultsBank={resultsBank}
          />
        </Route>
      </Switch>
      
    </div>
  );
}

export default withRouter(App);
