import './App.css';
import Nav from "./components/Nav"
import KeywordBuilder from "./pages/KeywordBuilder"
import FinalCart from "./pages/FinalCart"
import {Route, Switch} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route exact path="/">
          <KeywordBuilder />
        </Route>
        <Route path="/finalcart">
          <FinalCart />
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
