import React, { Component } from "react";

import { Content, View, Text, StyleSheet,Image,moment,TextInput,TouchableOpacity,Icon } from "react-1app";
import {Card,Hidden} from '@material-ui/core';
import VMasker from 'vanilla-masker';
import {maskFormate} from '../../infra/Util'
export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    // console.log(999999999999);
  }

  componentDidMount() {}

  componentWillUnmount() {

  }
  textoPlace(){
    let {info}=this.props;

    switch (info.type) {
      case "CEP":
      return
      ;
      default:

      return "Diga-me qual é a sua dúvida..."+(this.props.disabled?' ( Aguarde... )':'');
    }

  }
  config(){
    let {info}=this.props;
    if(!info) return {placeholder:"Diga-me qual é a sua dúvida..."+(this.props.disabled?' ( Aguarde... )':'')};
    let placeholder=info.PlaceHolder?info.PlaceHolder:"Digite aqui...";
    let tooltip=info.Tooltip;
    switch (info.type) {
      case "CPF":
      return {marcara:'999.999.999-99',placeholder,tooltip};
      case "TELEFONE":
      return {marcara:'(99) 9999 9999',placeholder,tooltip};
      case " CELULAR":
      return {marcara:'(99) 99999 9999',placeholder,tooltip};
      case "CEP":
      return {marcara:'99999-999',placeholder,tooltip};
      case "DATA":
      return {marcara:'99/99/9999',placeholder,tooltip};
      case "DINHEIRO":
      return {marcara:'money',placeholder,tooltip};
      default:
      return {placeholder:placeholder?placeholder:"Digite ...",tooltip};
    }

  }
  marcara(){
    return "Diga-me qual é a sua dúvida..."+(this.props.disabled?' ( Aguarde... )':'');
  }

  save(){
    console.log(this.text, this.props.info.PlaceHolder)
    // if(this.text.props.placeholder == this.props.info.PlaceHolder){
      
      //   this.setState({text : {props: {placeholder: "DIgite aqui..."}}}) 
      //   //this.text.props.placeholder.se "Digite aqui...";
      // }
      this.props.enviar();
  }
  render() {
    let {placeholder,marcara,tooltip}=this.config();
    console.log(placeholder,marcara)
    return (
      <div id='chat_input' className="view content_inputCustom">
        <Hidden smUp>
          <div className="view content_inputCustom_view41">
            <TextInput
              className="content_inputCustom_textinput3"
              value={this.props.value}
              onChange={value => {
                if(!this.props.disabled)this.props.onChange(maskFormate(value,marcara));
              }}
              keyboardType={"default"}
              id="cow-input"
              placeholder={placeholder}
              inputNative={true}
              onSubmitEditing={()=>this.props.enviar()}
              // disabled={this.props.disabled}
              // mask={marcara}
              />
            <TouchableOpacity className="content_inputCustom_botton2"
            style={{width: 50}}
              onPress={() => {
                if(!this.props.disabled)this.props.enviar();
              }}>
              <Icon
                className="content_inputCustom_icon2"
                style={styles.icon2}
                fromFontFamily={"Material Design Icons"}
                name={"send"}
              />
            </TouchableOpacity>
          </div>

        </Hidden>
        <Hidden xsDown>
          <div className="view content_inputCustom_view4">
            <TextInput
              style={{fontSize: 22}}
              ref={(text) => {this.text = text}}
              className="content_inputCustom_textinput2"
              value={this.props.value}
              onChange={value => {
                if(!this.props.disabled)this.props.onChange(maskFormate(value,marcara));
              }}
              keyboardType={"default"}
              placeholder={placeholder}
              inputNative={true}
              onSubmitEditing={()=>this.props.enviar()}
              // disabled={this.props.disabled}
              // mask={marcara}
              />
            <TouchableOpacity 
            style={{ width: 180 }}
            className="content_inputCustom_button"
              onPress={() => {
                if(!this.props.disabled) this.save()
              }}>
                            <Text style={styles.text}>{"Enviar"}</Text>

            </TouchableOpacity>
          </div>
          <Text style={styles.text2}>{"As informações aqui inseridas são de uso privado e confidencial"}</Text>
        </Hidden>
      </div>
    );
  }
}

var styles = StyleSheet.create({
  content: {
    alignSelf: "stretch",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column"
  },
  view4: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 10,
    minHeight: 100,
    borderRadius: 50,
    paddingLeft: 40,
    backgroundColor: "rgba(255,255,255,1)"
  },
  textinput2: {
    color: "rgba(0,0,0,1)",
    alignSelf: "stretch",
    textAlign: "left",
    fontWeight: "normal",
    flex: 1,
    fontSize: 22,
    fontFamily: 'Montserrat'
  },
  textinput3: {
    color: "rgba(0,0,0,1)",
    alignSelf: "stretch",
    textAlign: "left",
    fontWeight: "normal",
    flex: 1,
    fontSize: 14,
    fontFamily: 'Montserrat'
  },
  button: {
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: 40,
    width: 180,
    background: "linear-gradient(140deg,#64A73F,#AFC700)"
  },
  view41: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 5,
    minHeight: 60,
    borderRadius: 30,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgba(200,200,200,1)",
    paddingLeft: 30,
    backgroundColor: "rgba(255,255,255,1)"
  },
  button2: {
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: 25,
    width: 50,
    background: "linear-gradient(140deg,#64A73F,#AFC700)"
  },
  icon2: {
    transform: 'rotate(-40deg)',
    color: "rgba(255,255,255,1)",
    fontSize: 30,
    marginLeft:5,
    marginBottom:3
  },
  text: {
    textAlign: "left",
    color: "rgba(255,255,255,1)",
    alignSelf: "auto",
    fontWeight: "bold",
    fontSize: 23,
    fontFamily: 'Montserrat'
  },
  text2: {
    textAlign: "center",
    color: "#666",
    alignSelf: "stretch",
    fontWeight: "normal",
    fontSize: 13,
    marginTop:15,
    fontFamily: 'Montserrat'
  },
});
