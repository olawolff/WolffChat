import React from "react";
import { createStore } from "redux";
import reducers from "./redux/reducer";
import * as actions from "./redux/actions";
import RegisterScreens from "./index.pages.js";
import { Cloud } from "./infra";
import { View, ImageUpload, Alert } from "react-1app";
import Home from "./views/Home";

// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { MuiThemeProvider,createMuiTheme } from '@material-ui/core/styles';


require("moment/locale/pt-br");
var moment = require("moment");
moment.locale("pt-br");

var store = createStore(reducers);

var toProps = {
  screenProps: {
    store: store,
    actions: actions
  }
};
function mapStateToProps(state) {
  toProps.data = state;
  return { ...toProps };
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    ImageUpload.setHost(Cloud.getHost());
    // File.setHost(Cloud.getHost());
    ImageUpload.setToken(Cloud.getToken());
    // File.setToken(Cloud.setToken());
  }
  componentDidMount() {
    actions.init();
  }

  render() {
    return (
      <MuiThemeProvider>
        <View style={{ paddingTop: 0, minHeight: 0, flex: 1 }}>
          <Alert />
          <RegisterScreens
            ref={v => (this.registerScreens = v)}
            store={store}
            actions={actions}
            mapStateToProps={mapStateToProps}
          />
        </View>
      </MuiThemeProvider>
    );
  }
}
