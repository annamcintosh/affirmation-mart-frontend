import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ProductContainer } from "./pages/ProductContainer";
import { Checkout } from "./pages/Checkout";
import "./App.css";
import { AppNavbar } from "./pages/AppNavbar";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";

function App() {
  return (
    <div className="App">
      <Router>
        <AppNavbar />
        <Switch>
          <Route exact path="/checkout" render={() => <Checkout />} />
          <Route exact path="/sign-in" render={() => <SignInPage />} />
          <Route exact path="/sign-up" render={() => <SignUpPage />} />
          <Route exact path="/" render={() => <ProductContainer />} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
