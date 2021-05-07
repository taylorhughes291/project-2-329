import './App.css';
import Nav from "./components/Nav"
import KeywordBuilder from "./pages/KeywordBuilder"
import FinalCart from "./pages/FinalCart"
import {Route, Switch} from "react-router-dom"
import {useEffect, useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import {useMediaQuery} from "react-responsive"

function App() {
  ////////////////////////
  // Constants
  ////////////////////////

  // initialize state to capture person profile

  const [person, setPerson] = useState({
    name: "",
    budget: "",
    keywords: [],
    keywordText: "",
    selectedProducts: []
  })

  const [productSearch, setProductSearch] = useState([])
  
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

  ////////////////////////
  // Render
  ////////////////////////

  return (
    <div className="App">
      <Nav 
        handleReset={handleReset}
      />
      <Switch>
        <Route exact path="/">
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

export default App;
