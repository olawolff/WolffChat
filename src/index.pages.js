import React from "react";
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Redirect
} from "react-router-dom";
import { connect, Provider } from "react-redux";
import { StyleSheet, Navigator, View } from "react-1app";
import Home from "./views/Home";
import DashHeader from "./views/dash/Header.js";
import createBrowserHistory from "history/createBrowserHistory";
var customHistory = createBrowserHistory();

export default class Navegation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.mapStateToProps().screenProps.history = {
      push: page => {
        // console.log(page);
        customHistory.push(page);
        this.setState({ page: page });
      }
    };
  }
  componentDidMount() {}

  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(() => {
      var store = this.props.store.getState();
      if (store.user != this.state.user) this.setState({ user: store.user });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  render() {
    return (
      <Provider ref={"pro"} store={this.props.store}>
        <Router ref={v => (this.router = v)} history={customHistory}>
          <View style={{ flex: 1, minHeight: 0 }}>

            <View
              style={{
                alignSelf: "stretch",
                flex: 1,
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flexDirection: "column",
                minHeight: 0
              }}
            >
              {this.props.store.getState().user ? (
                <DashHeader
                  screenProps={this.props.mapStateToProps().screenProps}
                  history={customHistory}
                />
              ) : null}

              <PrivateRoute
                exact
                path="/"
                user={this.props.store.getState().user}
                store={this.props.store}
                component={withRouter(
                  connect(this.props.mapStateToProps)(Home)
                )}
              />

              <PrivateRoute
                exact
                path="/home"
                user={this.props.store.getState().user}
                store={this.props.store}
                component={withRouter(
                  connect(this.props.mapStateToProps)(Home)
                )}
              />


            </View>
          </View>
        </Router>
      </Provider>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      //   console.log(rest.user);

      // if (rest.user) {
        return <Component {...props} />;
      // }
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      );
    }}
  />
);

// const RouteLogin = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props => {
//       //   console.log(props.user);
//       if (!rest.user) {
//         return <Component {...props} />;
//       }
//       return (
//         <Redirect
//           to={{
//             pathname: "/home",
//             state: { from: props.location }
//           }}
//         />
//       );
//     }}
//   />
// );
