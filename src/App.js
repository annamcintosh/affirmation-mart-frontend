import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { Counter } from './features/counter/Counter';
// import { AppNavbar } from './pages/AppNavbar';
import { ProductContainer } from "./pages/ProductContainer";
import { OrderCheckout } from "./pages/OrderCheckout";

import "./App.css";
import { AppNavbar } from "./pages/AppNavbar";

function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <AppNavbar />
        </header>
        <Switch>
          <Route exact path="/checkout" component={OrderCheckout} />
          <Route exact path="/" component={ProductContainer} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
