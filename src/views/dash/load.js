import React, { Component } from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import {logo} from "../img";
import Image from "../../components/Image";

import { Content, View, StyleSheet } from "react-1app";

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
          className="content_load_image"
          height={100}
          width={300}
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
