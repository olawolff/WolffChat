import React, { Component } from "react";
import green from '@material-ui/core/colors/green';
import {LinearProgress,IconButton,Hidden} from '@material-ui/core';
import {iconUser,iconWolff} from "../img";
import { Content, View, Text, StyleSheet,Image,moment,Icon } from "react-1app";
import {TextChat,Opitions} from '../itemChat';
import Tooltip from '../../components/Tooltip';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // console.log(999999999999);
  }

  componentDidMount() {}

  componentWillUnmount() {}
  montar(item,key){
    if(item.attachmentLayout)item.type=item.attachmentLayout;
    // console.log(item.type);
    switch (item.type) {
      case 'message':
      return(
        <TextChat
          enviar={this.props.enviar}
          {...item}/>
      )
      case 'text':
      return(
        <TextChat
          enviar={this.props.enviar}
          {...item}/>
      )
      case 'list':
      return(
        <Opitions
          enviar={this.props.enviar}
          {...item}/>
      )
      default:
      console.log('Fora');
    }
  }
  position(position){
    let st={alignSelf: "auto",marginBottom:-18}
    if(position=='left') return{...st,alignItems:"flex-start",flexDirection:'row'}
    return {...st,alignItems:'flex-end',flexDirection:'row-reverse'};
  }

  render() {
    let {list}=this.props;

    // console.log(38);
    // console.log(list);
    // let flexDirection= item.position=='left'?"row":'row-reverse';
    return (
      <div className="view content_index_content">
        {list&&list.map((item,key)=>{
          let avatar=item.position=='left'&&list[(key-1)]?!(list[(key-1)].position=='left'):true;
          let info=item.position=='left'&&list[(key+1)]?!(list[(key+1)].position=='left'):true;

          return(
            <View style={[styles.item,{flexDirection:item.position=='left'?"row":'row-reverse',marginTop:10,}]}>
              <Hidden smUp>
                <View style={[styles.view7Phone,{alignItems:item.position=='left'?"flex-start":"flex-end"}]}>
                  <View style={this.position(item.position)}>
                    {avatar&&<Avatar item={item} nomeUser={this.props.nomeUser}/>||<View style={styles.view3Phone}/>}
                    {avatar&&<InfoMessage item={item} nomeUser={this.props.nomeUser}/>}
                  </View>
                  <View style={[styles.view5Phone]}>
                    {this.montar(item,key)}
                  </View>
                </View>
              </Hidden>
              <Hidden xsDown>
                {avatar&&<Avatar item={item} nomeUser={this.props.nomeUser}/>||<View style={styles.view3}/>}
                <View style={[styles.view5,{alignItems:item.position=='left'?"flex-start":"flex-end"}]}>
                  {this.montar(item,key)}
                  {info&&<InfoMessage item={item} nomeUser={this.props.nomeUser}/>}
                </View>
              </Hidden>
              {item.entities&&item.entities[0]&&item.entities[0].Tooltip&&
                <Tooltip  id="tooltip-right" title={item.entities[0].Tooltip} position={item.position=='left'?"right":'left'}>
                  <IconButton style={styles.tooltip}>
                    <Icon
                      style={styles.icon2}
                      fromFontFamily={"Material Design Icons"}
                      name={"information-outline"}
                      />
                  </IconButton>
                </Tooltip>}
                <View style={styles.view6}/>
              </View>
            )})}
            {this.props.digitando&&
              <Digitando/>
            }
          </div>
        );
      }
    }
    class Avatar extends Component {
      constructor(props) {
        super(props);
        this.state = {};
      }
      logo(){
        // if(this.props.nomeUser !='Cliente')return "/img/iconUser.png"
        let nome=this.props.nomeUser.split(" ");
        return nome[0].charAt(0).toUpperCase()+''+(nome[1]?nome[1].charAt(0).toUpperCase():'')
        // return (this.props.aluno.nome.split(" ")[0]+" "+(sobrnome?sobrnome.charAt(0).toUpperCase():'')).substring(0, 8);
      }
      render() {
        let {item}=this.props;
        let background=item.position=='left'?"linear-gradient(140deg,#64A73F,#AFC700)":'#666'
        return (
          <View style={styles.view4}>
            <Hidden smUp>
            <View style={[styles.view3Phone,{background}]}>
                {(this.props.nomeUser =='Cliente'||item.position=='left')&&
                  <Image
                    style={styles.imagePhone}
                    source={(item.position=='left'?iconWolff:iconUser)}
                    resizeMode={"contain"}
                    />
                  ||
                  <Text style={styles.textPhoneLogo}>
                    {this.logo()}
                  </Text>
                }
              </View>
            </Hidden>
            <Hidden xsDown>
            <div className={"view content_index_view3 " + (item.position=='left'?"content_index_view3Phone_left":"content_index_view3Phone_else")}>
                {(this.props.nomeUser =='Cliente'||item.position=='left')&&
                  <Image
                  style={styles.image}
                    source={(item.position=='left'?iconWolff:iconUser)}
                    resizeMode={"contain"}
                    />
                  ||
                  <Text style={styles.textLogo}>
                    {this.logo()}
                  </Text>
                }
              </div>
            </Hidden>
          </View>
        );
      }
    }

    class InfoMessage extends Component {
      constructor(props) {
        super(props);
        this.state = {};
      }

      render() {
        let {item}=this.props;
        // if(item.position!='left')console.log(item);
        // let background=item.position=='left'?"linear-gradient(140deg,#64A73F,#AFC700)":'#666'
        return (
          <div className="view content_index_view4">
            <Hidden smUp>
              <div className="view content_index_view6Phone">
              <Text style={styles.textPhone}>{ (item.position=='left'?window.chat.bot_name:this.props.nomeUser)+" - "+moment(item.timestamp).format('hh:mm')}</Text>
                {item.position!='left'&&<View style={[styles.status,{background:item.enviado?'linear-gradient(140deg,#64A73F,#AFC700)':'#666'}]}/>}
                {item.position!='left'&&<View style={[styles.status,{background:item.respondido?'linear-gradient(140deg,#64A73F,#AFC700)':'#666'}]}/>}
            </div>
            </Hidden>
            <Hidden xsDown>
              <Text style={{fontFamily: "Montserrat"}} className="content_index_text">{ (item.position=='left'?window.chat.bot_name:this.props.nomeUser)+" - "+moment(item.timestamp).format('hh:mm')}</Text>
              {item.position!='left'&&<View style={[styles.status,{background:item.enviado?'linear-gradient(140deg,#64A73F,#AFC700)':'#666',marginTop:10}]}/>}
              {item.position!='left'&&<View style={[styles.status,{background:item.respondido?'linear-gradient(140deg,#64A73F,#AFC700)':'#666',marginTop:10}]}/>}
            </Hidden>
          </div>
        );
      }
    }

    class Digitando extends Component {
      constructor(props) {
        super(props);
        this.state = {};
      }

      render() {
        let label=window.chat.bot_name+" está digitando"
        return (
          <View style={styles.view4}>
            <Hidden smUp>
            <View style={[styles.view7Phone,{alignItems:"flex-start"}]}>
                <View style={styles.positionDigitado}>
                  <Avatar item={{position:"left"}} nomeUser=''/>
                  </View>
                  <View style={styles.view5Phone}>
                  <View style={styles.view2} className="content_index_view2_animation">
                    <Text style={{fontFamily: 'Montserrat'}} className="content_index_digitando">{label}</Text>
                    {/* <LinearProgress color="primary" className="content_index_progress" /> */}
                    </View>
                </View>
                </View>
            </Hidden>
            <Hidden xsDown>
              <Avatar item={{position:"left"}} nomeUser=''/>
              <View style={styles.view5}>
                <div className="view content_index_view2">
                  <Text style={{fontFamily: 'Montserrat'}} className="content_index_digitando">{label}</Text>
                  {/* <LinearProgress color="primary" className="content_index_progress" /> */}
                </div>
                </View>

              <div  className="view content_index_view6"/>
            </Hidden>
            </View>
        );
      }
    }

    var styles = StyleSheet.create({

      view6: {
        alignSelf: "stretch",
        flex: 1,
      },
      positionDigitado:{alignSelf: "auto",marginBottom:-18,alignItems:"flex-start",flexDirection:'row'},
      status: {
        alignSelf: "auto",
        height: 8,
        width:8,
        borderRadius:4,
        margin:2
      },
      view4: {
        alignSelf: "stretch",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "row",
      },
      item: {
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
        marginTop:10,

      },
      view5: {
        alignSelf: "auto",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "column",
        marginRight:20,
        marginLeft:20
      },
      view3: {
        alignSelf: "auto",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        minWidth: 50,
        minHeight: 50,
        borderRadius: 25,
      },
      view5Phone: {
        alignSelf: "auto",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "column",
      },
      view6Phone: {
        alignSelf: "auto",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      },
      view7Phone:{
        flexDirection:'column',alignSelf: "stretch",marginTop:10
      },
      view3Phone: {
        alignSelf: "auto",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        minWidth: 36,
        minHeight: 36,
        zIndex:100,
        borderRadius: 18,
      },
      imagePhone: {
        width: 20,
        height: 20,
        alignSelf: "auto",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "column"
      },
      textPhone: {
        textAlign: "left",
        color: "#808080",
        alignSelf: "stretch",
        fontWeight: "normal",
        fontSize: 14,
        marginLeft:15,
        marginRight:10,
        fontFamily: 'Montserrat'
      },
      textPhoneLogo: {
        textAlign: "center",
        color: "rgba(238,238,238,1)",
        alignSelf: "stretch",
        fontWeight: "bold",
        fontSize: 18,
        fontFamily: 'Montserrat'
      },
      textLogo: {
        textAlign: "center",
        color: "rgba(238,238,238,1)",
        alignSelf: "stretch",
        fontWeight: "bold",
        fontSize: 24,
        fontFamily: 'Montserrat'
      },
      image: {
        width: 25,
        height: 25,
        alignSelf: "auto",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "column"
      },
      text: {
        textAlign: "left",
        color: "#808080",
        alignSelf: "stretch",
        fontWeight: "normal",
        fontSize: 14,
        margin:10,
        fontFamily: 'Montserrat'
      },
      view2: {
        alignSelf: "auto",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "column",
        padding: 20,
        backgroundColor: "rgba(255,255,255,1)",
        borderRadius: 15
      },
      digitando: {
        textAlign: "left",
        color: "#808080",
        alignSelf: "stretch",
        fontWeight: "normal",
        fontSize: 12,
        marginBottom:5,
        fontFamily: 'Montserrat'
      },
      progress:{
        width:'100%'
      },
      icon2: {
        color: "#666",
        fontSize: 20
      },
      tooltip:{
        maxWidth:40,
        marginBottom:30
      }
    });
