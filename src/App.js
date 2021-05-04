import './App.css';
import Nav from "./components/Nav"
import KeywordBuilder from "./pages/KeywordBuilder"
import FinalCart from "./pages/FinalCart"
import {Route, Switch} from "react-router-dom"
import {useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';

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

  ////////////////////////
  // Functions
  ////////////////////////

  const handleSetPerson = (value) => {
    setPerson(value)
  }


  


  ////////////////////////
  // Render
  ////////////////////////

  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route exact path="/">
          <KeywordBuilder 
            person={person}
            setPerson={setPerson}
          />
        </Route>
        <Route path="/finalcart">
          <FinalCart />
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
