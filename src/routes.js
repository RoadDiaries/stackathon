import React, { Component } from "react";
// import {connect} from 'react-redux'
import { withRouter, Route, Switch, BrowserRouter } from "react-router-dom";
import PropTypes from "prop-types";
// import {Login, Signup, UserHome} from './components'
// import {me} from './store'
import App from "./components/app";
import AddEntry from "./components/addEntry";
import Landmarks from "./components/landmarks";
import HomePage from "./components/Home";

/**
 * COMPONENT
 */
class Routes extends Component {
  //   componentDidMount() {
  //     this.props.loadInitialData()
  //   }

  render() {
    // const {isLoggedIn} = this.props

    return (
      //   <BrowserRouter>
      <Switch>
        {/* <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} /> */}
        <Route exact path="/" component={HomePage} />
        <Route exact path="/entries/:id" component={Landmarks} />
        <Route exact path="/newEntry" component={AddEntry} />
        {/* {isLoggedIn && ( */}
        {/* <Switch> */}
        {/* Routes placed here are only available after logging in */}
        {/* <Route exact path="/newEntry" component={AddEntry} /> */}

        {/* <Route path="/home" component={UserHome} /> */}
        {/* </Switch> */}
        {/* )} */}
        {/* Displays our Login component as a fallback */}
        {/* <Route exact path="/" component={App} /> */}
        {/* <Route component={Login} /> */}
      </Switch>
      //   </BrowserRouter>
    );
  }
}

export default Routes;

/**
 * CONTAINER
//  */
// const mapState = state => {
//   return {
//     // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
//     // Otherwise, state.user will be an empty object, and state.user.id will be falsey
//     isLoggedIn: !!state.user.id
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     loadInitialData() {
//       dispatch(me())
//     }
//   }
// }

// // The `withRouter` wrapper makes sure that updates are not blocked
// // when the url changes
// export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
// Routes.propTypes = {
//   loadInitialData: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
