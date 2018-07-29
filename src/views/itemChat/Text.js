import React, { Component } from "react";

import { Content, View, Text, StyleSheet } from "react-1app";

export default class TextChat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() { }

  componentWillUnmount() { }
  position(position){
    if(position=='left') return{  borderTopLeftRadius:1}
    return {  borderTopRightRadius:1};
  }
    render() {
      return (
        <View style={styles.content}>
          <View style={[styles.view2,this.position(this.props.position)]}>
          <Text style={{fontFamily : "Montserrat"}} className="content_text_Text">{this.props.text}</Text>
          </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  content: {
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
    padding: 20,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 15,
  },
  text: {
    textAlign: "left",
    color: "#666",
    alignSelf: "stretch",
    fontWeight: "normal",
    fontSize: 20,
    fontFamily: 'Montserrat'
  }
});
