import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProductContainer } from "./pages/ProductContainer";
import { OrderCheckout } from "./pages/OrderCheckout";
import "./App.css";
import { AppNavbar } from "./pages/AppNavbar";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";

function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <AppNavbar />
        </header>
        <Switch>
          <Route exact path="/checkout" component={OrderCheckout} />
          <Route exact path="/sign-in" component={SignInPage} />
          <Route exact path="/sign-up" component={SignUpPage} />
          <Route exact path="/" component={ProductContainer} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
