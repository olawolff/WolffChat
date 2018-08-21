import React, { Component } from "react";

import { TouchableOpacity, Content, View, Icon,Image, StyleSheet } from "react-1app";
import {
  Button
} from "@material-ui/core";
import * as actions from "../../redux/actions";
import { NavLink } from "react-router-dom";
import {logoBranco} from "../img";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true };
  }

  componentDidMount() {}

  componentWillUnmount() {}
  sair() {
    // this.props.screenProps.store.dispatch(actions.logout());
  }

  openPageButton() {
    console.log(this);
    console.log(this.props.screenProps.history);
    this.props.screenProps.history.push("/login");
    // this.props.navigation.navigate("login", {
    //   activity: this,
    //   oldState: this.state
    // });
  }

  render() {
    return (
      <div className="view content_header">
        <Image
          className="content_header_image"
          src={logoBranco}
          resizeMode={"contain"}
        />
        <div className="view content_header_view3"/>
        <div className="view content_header_view4">

          <TouchableOpacity
            onPress={() => {
                window.open('http://olawolff.com','_blank');
            }}
            className="content_header_button2"
          >
            <Icon
              className="content_header_icon2"
              fromFontFamily={"Material Icons"}
              name={"info"}
            />
          </TouchableOpacity>
        </div>
      </div>
    );
  }
}

