import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProductContainer } from "./pages/ProductContainer";
import { Checkout } from "./pages/Checkout";
import "./App.css";
import { AppNavbar } from "./pages/AppNavbar";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { useDispatch } from "react-redux";
import { loadUserAsync } from './features/user/userSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserAsync());
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
          <AppNavbar />
        <Switch>
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/sign-in" component={SignInPage} />
          <Route exact path="/sign-up" component={SignUpPage} />
          <Route exact path="/" component={ProductContainer} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
