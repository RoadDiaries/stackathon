import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AddEntry from './components/addEntry';
import Landmarks from './components/landmarks';
import HomePage from './components/Home';
import Picture from './components/picture';
import SignIn from './components/SignIn';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route
          exact
          path="/entries/:id"
          render={routeProps => <Landmarks city={routeProps.match.params.id} />}
        />
        <Route exact path="/picture" component={Picture} />
        <Route exact path="/newEntry" component={AddEntry} />
        <Route exact path="/login" component={SignIn} />
      </Switch>
    );
  }
}

export default Routes;
