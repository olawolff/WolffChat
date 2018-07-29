import React, { Component } from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import {logo} from "../img";

import { Content, View, Image, StyleSheet } from "react-1app";

export default class load extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="view content_load">
        <Image
          style={styles.image}
          source={logo}
          resizeMode={"contain"}
          />
        <div className="view content_load_view2">
          <LinearProgress color="primary" className="content_load_progress" />
        </div>
      </div>
    );
  }
}

var styles = StyleSheet.create({
  content: {
    backgroundColor: "rgba(238,238,238,1)",
    alignSelf: "stretch",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  progress:{
    width:300
  },
  image: {
    width: 300,
    height: 100,
    alignSelf: "auto",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column"
  },
  view2: {
    alignSelf: "auto",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
    width: 300,
    height: 10,
    marginTop: 20
  }
});
