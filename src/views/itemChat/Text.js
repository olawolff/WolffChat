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
        <div className={this.props.position == "left" && this.props.text == "Confirma??" ? "itemChat_text_content_left" : "itemChat_text_content_right"}>
          <View className="itemChat_text_view2 " style={this.props.avatar ? this.position(this.props.position) : null}>
          <Text style={{fontFamily : "Montserrat"}} className="content_text_Text">{this.props.text}</Text>
          </View>
      </div>
    );
  }
}

