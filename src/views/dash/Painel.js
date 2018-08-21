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
import Image from '../../components/Image';
import {wolffGif} from "../img";

import {
  getMessages,
  message
} from "../../redux/worker/lineClient";
import Load from "./load";
import Header from "./Header";
import Chat from "../chat";
import InputCustom from "../InputCustom";
import CustomScroll from 'react-custom-scroll';
import {Avatar} from "../chat/index";
let listaEspera = [];
let usoDaLista = null;
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      nomeUser: "",
      load:true,
      info:{},
      list:[]
    };
    this.heightScroll=300;
  }

  componentDidMount() {
    this.init()
  }

  listaEspera(callback){
    if(!usoDaLista){
      callback()
      usoDaLista = true;
    }else{
      listaEspera.push({requisicao : callback})
    }
  }

  proximoDaLista(){
    if(listaEspera[0]){
      listaEspera[0].requisicao();
      listaEspera.splice(0, 1);
      if(listaEspera.length <= 1){
      this.setState({
        digitando:false,
      })
    }
    }else{
      usoDaLista = false;
    }
  }

  delayOptions(lista){
    let {list}=this.state;
    let aqui = this;
    this.listaEspera(() => {    
     function proximo (pos) {
      if(pos < lista.length){
        let msg = lista[pos]        
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
          aqui.setState({
            digitando:false,
          })
          //             list.find(x => x.channelData&&x.channelData.localId === msg.channelData.localId)= {...oldItem,...msg,respondido:true};
          //             console.log(oldItem);
          //             console.log(list);
        }else {
          aqui.state.info=msg.entities&&msg.entities[0]?msg.entities[0]:{};
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
          pos++
          proximo(pos);
        aqui.setState({
          list:list.sort((a,b) =>(  a.timestamp > b.timestamp ? 1 : -1)),load:false,
          // digitando:false,
          nomeUser:aqui.state.info.Nome?aqui.state.info.Nome:aqui.state.nomeUser
        })
        aqui.orientacao()
      }else{
       setTimeout(() => {
        aqui.proximoDaLista();       
       }, 3000); 
       
      }
    
    }
    proximo(0);
  })
  }

  init(){
    getMessages(({activities,watermark})=>{
      let {list}=this.state;
      if (activities&&activities[0]) {
        this.delayOptions(activities)
        // console.log(activities[0]);
        // activities.map(msg=>{
         

        // })
        
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
            return{...x,...activity,id:'agaurdando',enviado:true, respondido: false}
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
              return{...x,...activity,enviado:true,respondido:false}
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
          this.eviarMassagem(activity,1000,this.state.message)
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
        <div style={{minHeight:0}} className="view content_painel">
          {false&&<Header/>}
          <Hidden smUp >
            <div className="view content_painel_content4">
              <div className="view content_painel_view42">
                {this.historico()}
              </div>
              {this.state.digitando&&
              <Digitando/>
              }
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
              {this.state.digitando&&
              <Digitando/>
              }
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
            <div style={{minHeight:0}} className="view content_painel_content2">
              {this.historico()}
              {this.state.digitando&&
              <Digitando/>
              }
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
        <div id="chat" style={{minHeight:0}} className="view conteiner_chat" >
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

  class Digitando extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      let label=window.chat.bot_name+" está digitando..."
      return (
      //  <View style={styles.view4}>
         <div className="view content_index_view4_2">
          <Hidden smUp>
          <div className="content_index_view7Phone_align_digitando">
          <div className="content_index_positionDigitado">
                <Avatar item={{position:"left"}} nomeUser=''/>
                </div>
                <div className="content_index_view5Phone">
                <div className="view content_index_view2">
                <Image
                  className="content_index_imagePhone"
                  height={22}
                  width={"auto"}
                  minWidth={25}
                  source={wolffGif}
                  resizeMode={"contain"}
                  />
                  {/* <LinearProgress color="primary" className="content_index_progress" /> */}
                  </div>
                  </div>
              </div>
          </Hidden>
          <Hidden xsDown>
          <div className="content_index_view7_align_digitando">
            <Avatar item={{position:"left"}} nomeUser=''/>
            <div className="content_index_view5">
              <div className="view content_index_view2">
              <Image
                  className="content_index_imagePhone"
                  height={22}
                  minWidth={25}
                  width={"auto"}
                  source={wolffGif}
                  resizeMode={"contain"}
                  />
                {/* <LinearProgress color="primary" className="content_index_progress" /> */}
              </div>
              </div>
              </div>

            <div  className="view content_index_view6"/>
          </Hidden>
          </div>
      );
    }
  }