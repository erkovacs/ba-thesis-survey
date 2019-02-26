import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import InputName from "./components/InputName";
import FillSurvey from "./components/FillSurvey";
import ThankYou from "./components/ThankYou";
import "./assets/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <div className="container-fluid">
            <Route exact path="/" component={InputName} />
            <Route exact path="/fill-survey" component={FillSurvey} />
            <Route exact path="/thank-you" component={ThankYou} />
          </div>
        </Switch>
      </Router>
    );
  }
}

export default App;
