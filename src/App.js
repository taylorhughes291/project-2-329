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

  console.log(props.location.pathname)
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
          <LandingPage />
        </Route>
        <Route path="/giftsearch">
          <KeywordBuilder 
            person={person}
            setPerson={setPerson}
            productSearch={productSearch}
            setProductSearch={setProductSearch}
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
