import React, { Component } from "react";
import TextChat from './Text';
import $ from 'jquery';

import { Content, View, Text, StyleSheet,TouchableOpacity } from "react-1app";

export default class Opitions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setFocusInput() {
    setTimeout(function () {
      $("#chat-text-input").focus();
    }, 50);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    let{attachments}=this.props;
    // console.log(attachments);
    let item=attachments[0].content
    return (
      <div className="content_opitions">
        <TextChat
          text={item.text}
          position={this.props.position}
          />
        <div className="content_opitions_view">

          {item.buttons&&item.buttons.map((bot)=>(
            <TouchableOpacity className="content_opitions_button" style={{marginBottom: 5, width: 'auto'}}
              disabled={item.usado}
              onPress={() => {
                this.props.enviar(bot.value)
                item.usado=true;
                this.setFocusInput();
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

