import React, { Component } from "react";

import {
  TouchableOpacity,
  Content,
  View,
  Text,moment,
  TextInput,ScrollView,
  StyleSheet
} from "react-1app";
import $ from 'jquery'
import {Card,Hidden} from '@material-ui/core';

import {
  getMessages,
  message
} from "../../redux/worker/lineClient";
import Load from "./load";
import Header from "./Header";
import Chat from "../chat";
import InputCustom from "../InputCustom";
import CustomScroll from 'react-custom-scroll';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      nomeUser:'Cliente',
      load:true,
      info:{},
      list:[]
    };
    this.heightScroll=300;
  }

  componentDidMount() {
    this.init()
  }
  init(){
    getMessages(({activities,watermark})=>{
      let {list}=this.state;
      if (activities&&activities[0]) {
        // console.log(activities[0]);
        activities.map(msg=>{
          let oldItem=msg.channelData?list.find(x => x.channelData&&x.channelData.localId&&msg.channelData&&x.channelData.localId == msg.channelData.localId):null
          if(oldItem ){
            // console.log(oldItem);
            // console.log(msg);
            list=list.map(x=>{
              if(x.channelData&&x.channelData.localId == msg.channelData.localId){
                // console.log(33);
                return{...x,...msg,respondido:true}
              }else {
                return x;
              }
            })
            this.setState({
              digitando:false,
            })
            //             list.find(x => x.channelData&&x.channelData.localId === msg.channelData.localId)= {...oldItem,...msg,respondido:true};
            //             console.log(oldItem);
            //             console.log(list);
          }else {
            this.state.info=msg.entities&&msg.entities[0]?msg.entities[0]:{};
            list.push({
              id: msg.id,
              position: "left",
              type: "text",
              text: msg.text,
              entities:msg.entities,
              timestamp: msg.timestamp,
              attachmentLayout:msg.attachmentLayout,
              attachments:msg.attachments
            })
          }

        })
        this.setState({
          list:list.sort((a,b) =>(  a.timestamp > b.timestamp ? 1 : -1)),load:false,
          // digitando:false,
          nomeUser:this.state.info.Nome?this.state.info.Nome:this.state.nomeUser
        })
        this.orientacao()
      }
    })
  }
  enviar(res){
    if(!this.state.message&&!res)return;
    let {list}=this.state;
    var localId = new Date().getTime();
    var activity = {
      id: localId,
      type: 'message',
      text: (this.message?this.message+"\n":'')+(res?res:this.state.message),
      from: { id: 'james' },
      channelData: { localId: localId } };
      this.message =activity.text;
      this.activityId =activity.id;
      if(list.find(x =>x.id=='agaurdando')){
        list=list.map(x=>{
          if(x.id=='agaurdando'){
            return{...x,...activity,id:'agaurdando',enviado:true}
          }else {
            return x;
          }
        })
      }else {
        list.push({...activity,position: "right",type: "text",timestamp:moment().toJSON(),id:'agaurdando',enviado:true});
      }
      this.eviarMassagem(activity,activity.text.length*500);
      this.orientacao()
      this.setState({
        message: "",
        list
      });
    }
    eviarMassagem(activity,time,old){
      setTimeout( ()=> {
        if((!this.state.message||old&&this.state.message==old)&&this.activityId==activity.id) {
          let {list}=this.state;
          list=list.map(x=>{
            if(x.id=='agaurdando'){
              // console.log(33);
              return{...x,...activity,enviado:true,respondido:true}
            }else {
              return x;
            }
          })
          this.message=null;
          this.orientacao()
          message(activity);
          this.setState({
            list,
            digitando:true,
            info:{}
          });
        }else if(this.activityId==activity.id) {
          this.eviarMassagem(activity,2000,this.state.message)
        }
      }, time);
    }
    componentWillUnmount() {}
    orientacao(){
      setTimeout(function () {
        $('.inner-container').animate({
          scrollTop: $(".inner-container")[0].scrollHeight
        }, 1000);
      }, 30);
    }
    render() {
      // console.log(this.state.info);
      if(this.state.load)return(<Load/>) ;
      return (
        <div className="view content_painel">
          {false&&<Header/>}
          <Hidden smUp >
            <div className="view content_painel_content4">
              <div className="view content_painel_view42">
                {this.historico()}
              </div>
              <InputCustom
                value={this.state.message}
                onChange={value => {
                  this.setState({ message: value});
                }}
                keyboardType={"default"}
                enviar={()=>this.enviar()}
                disabled={this.state.digitando}
                info={this.state.info}
                />
            </div>
          </Hidden>
          <Hidden mdUp xsDown>
            <div className="view content_painel_content3">
              {this.historico()}
              <InputCustom
                value={this.state.message}
                onChange={value => {
                  this.setState({ message: value});
                }}
                keyboardType={"default"}
                enviar={()=>this.enviar()}
                disabled={this.state.digitando}
                info={this.state.info}
                />
            </div>
          </Hidden>
          <Hidden smDown>
            <div className="view content_painel_content2">
              {this.historico()}
              <InputCustom
                value={this.state.message}
                onChange={value => {
                  this.setState({ message: value});
                }}
                keyboardType={"default"}
                enviar={()=>this.enviar()}
                disabled={this.state.digitando}
                info={this.state.info}
                />
            </div>
          </Hidden>
        </div>
      );
    }

    altura(){
      // let n=$("#chat")?$("#chat").height():null;
      setTimeout(function () {

        if($("#chat").height)this.heightScroll=$("#chat").height();
        // return this.heightScroll;
        if($(".custom-scrollbar"))$(".custom-scrollbar").height(this.heightScroll-9);
        if($(".inner-container"))$(".inner-container").height(this.heightScroll);
      }, 19);

    }
    // <View  id="scrollp" className="view scroll_view" style={[styles.scroll,{height:this.altura()}]} >

    historico(){
      this.altura()
      return(
        <div id="chat" className="view conteiner_chat" >
          <CustomScroll flex="1" id="scrollp" >
            <Chat
              nomeUser={this.state.nomeUser}
              list={this.state.list}
              digitando={this.state.digitando}
              enviar={(value)=>this.enviar(value)}
              />
          </CustomScroll>
        </div>
      )
    }
  }

  var styles = StyleSheet.create({
    content: {
      // background: "linear-gradient(140deg,#64A73F,#AFC700)",
      alignSelf: "stretch",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
    viewFoter:{
      background: "linear-gradient(140deg,#64A73F,#AFC700)",
      alignSelf: "stretch",
      height:10
    },
    list:{
      flex: 1,
      alignSelf: "stretch",
      flexDirection:'column'
    },
    content2: {
      backgroundColor: "rgba(238,238,238,1)",
      flex: 1,
      alignItems: "flex-start",
      // margin:40,
      padding:30,
      // marginTop:10,
      borderRadius:10,
      justifyContent: "flex-start",
      flexDirection: "column",
      // boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)'
    },
    content3: {
      backgroundColor: "rgba(238,238,238,1)",
      flex: 1,
      padding:50,
      paddingBottom:20,
      alignItems: "flex-start",
      justifyContent: "flex-start",
      flexDirection: "column",
      // marginBottom:10
    },
    content4: {
      backgroundColor: "rgba(238,238,238,1)",
      flex: 1,
      padding:15,
      alignItems: "flex-start",
      justifyContent: "flex-start",
      flexDirection: "column",
    },
    view6:{
      alignSelf: "stretch",
      flex: 1,
      padding:30,
      flexDirection: "column"
    },
    view42:{
      alignSelf: "stretch",
      flex: 1,
      padding:10,
      flexDirection: "column"
    },
    scroll: {
      alignSelf: "stretch",
      flexDirection: "column",
      display:null,
      // height:'80%',
      // flex: 1,
      alignSelf: "stretch",
      overflowY: "auto",
      overflowX: "hidden"
    },

  });
