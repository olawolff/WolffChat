import React, { Component } from "react";
import TextChat from './Text';

import { Content, View, Text, StyleSheet,TouchableOpacity } from "react-1app";

export default class Opitions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    let{attachments}=this.props;
    // console.log(attachments);
    let item=attachments[0].content
    return (
      <div className="view content_opitions">
        <TextChat
          text={item.text}
          position={this.props.position}
          />
        <div className="view content_opitions_view">

          {item.buttons&&item.buttons.map((bot)=>(
            <TouchableOpacity className="content_opitions_button" style={{width: 180}}
              disabled={item.usado}
              onPress={() => {
                this.props.enviar(bot.value)
                item.usado=true;
                // if(!this.props.disabled)this.props.enviar();
              }}>
              <Text style={{fontFamily: "Montserrat", alignItems: "center"}} className="content_opitions_text">{bot.title}</Text>
            </TouchableOpacity>
          ))}
        </div>
      </div>
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
    flexDirection: "row",
    marginTop:20
  },
  text: {
    textAlign: "center",
    color: "#666",
    alignSelf: "stretch",
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: 'Montserrat'
  },
  button: {
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: 40,
    height:80,
    width: 180,
    marginLeft:30,

    borderStyle: "solid",
    borderWidth: 6,
    borderColor: "#AFC700"
    // background: "linear-gradient(140deg,#64A73F,#AFC700)"
  },
});
