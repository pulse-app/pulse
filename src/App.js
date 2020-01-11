import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Account from "./components/account/account";
import Dashboard from "./components/dashboard/Dashboard";

class App extends Component {
  state = {
    user: {}
  };

  setSignedInUser = user => {
    this.setState({ user: user });
  };

  emptyState = () => {
    this.setState({user: {}})
}
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Dashboard user={this.state.user} onClick={this.emptyState}/>
          </Route>
          <Route path="/account">
            <Account setSignedInUser={this.setSignedInUser} />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
