import React, { Component } from "react";
import green from "@material-ui/core/colors/green";
import { LinearProgress, Hidden } from "@material-ui/core";
import { IconButton } from "../../components/IconButton/index.js";
import { iconUser, iconWolff } from "../img";
import {wolffGif} from "../img";

import { Content, View, Text, StyleSheet, moment } from "react-1app";
import { TextChat, Opitions } from "../itemChat";
import Tooltip from "../../components/Tooltip";
import TextView from "../../components/TextView";
import Icon from "../../components/Icon";
import Image from "../../components/Image";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // console.log(999999999999);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  montar(item, key, avatar, info) {
    if (item.attachmentLayout) item.type = item.attachmentLayout;
    switch (item.type) {
      case "message":
        return (
          <TextChat
            enviar={this.props.enviar}
            avatar={avatar}
            info={info}
            {...item}
          />
        );
      case "text":
        return (
          <TextChat
            enviar={this.props.enviar}
            avatar={avatar}
            info={info}
            {...item}
          />
        );
      case "list":
        return <Opitions enviar={this.props.enviar} {...item} />;
      default:
        console.log("Fora");
    }
  }

  position(position) {
    let st = { alignSelf: "auto", marginBottom: -18 };
    if (position == "left")
      return { ...st, alignItems: "flex-start", flexDirection: "row" };
    return { ...st, alignItems: "flex-end", flexDirection: "row-reverse" };
  }

  render() {
    let { list } = this.props;

    // console.log(38);
    // console.log(list);
    // let flexDirection= item.position=='left'?"row":'row-reverse';
    return (
      <div className="view content_index_content">
        {list &&
          list.map((item, key) => {
            let avatar =
              item.position == "left" && list[key - 1]
                ? !(list[key - 1].position == "left")
                : true;
            let info =
              item.position == "left" && list[key + 1]
                ? !(list[key + 1].position == "left")
                : true;

            return (
              <div
                className={
                  item.position == "left"
                    ? "content_index_item"
                    : "content_index_item_left"
                }
              >
                <Hidden smUp>
                  <div
                    className={
                      "content_index_view7Phone " +
                      (item.position == "left"
                        ? "content_index_view7Phone_left"
                        : "content_index_view7Phone_not")
                    }
                  >
                    <View style={this.position(item.position)}>
                      {(avatar && (
                        <Avatar item={item} nomeUser={this.props.nomeUser} />
                      )) || <div className="content_index_view3Phone" />}
                      {avatar && (
                        <InfoMessage
                          item={item}
                          nomeUser={this.props.nomeUser}
                        />
                      )}
                    </View>
                    <div className="content_index_view5Phone">
                      {this.montar(item, key, avatar, info)}
                    </div>
                  </div>
                </Hidden>
                <Hidden xsDown>
                  {(avatar && (
                    <Avatar item={item} nomeUser={this.props.nomeUser} />
                  )) || <div className="content_index_view3" />}
                  <div
                    className={
                      "content_index_view5 " +
                      (item.position == "left"
                        ? "content_index_view5_left"
                        : "content_index_view5_right")
                    }
                  >
                    {this.montar(item, key, avatar, info)}
                    {info && (
                      <InfoMessage item={item} nomeUser={this.props.nomeUser} />
                    )}
                  </div>
                </Hidden>

                <Hidden smUp>
                  <div style={{ marginTop: 25 }}>
                    {item.entities &&
                      item.entities[0] &&
                      item.entities[0].Tooltip && (
                        <Tooltip
                          id="tooltip-right"
                          title={item.entities[0].Tooltip}
                          position={item.position == "left" ? "right" : "left"}
                        >
                          <IconButton>
                            <Icon
                              fromFontFamily={"Material Design Icons"}
                              name={"information-outline"}
                            />
                          </IconButton>
                        </Tooltip>
                      )}
                  </div>
                </Hidden>
                <Hidden xsDown>
                  <div style={{ marginBottom: 30 }}>
                    {item.entities &&
                      item.entities[0] &&
                      item.entities[0].Tooltip && (
                        <Tooltip
                          id="tooltip-right"
                          title={item.entities[0].Tooltip}
                          position={item.position == "left" ? "right" : "left"}
                        >
                          <IconButton>
                            <Icon
                              className={"MuiIconButton-root-30_test"}
                              fromFontFamily={"Material Design Icons"}
                              name={"information-outline"}
                            />
                          </IconButton>
                        </Tooltip>
                      )}
                  </div>
                </Hidden>
                <div className="content_index_view6_2" />
              </div>
            );
          })}
        {/* {this.props.digitando&&
              <Digitando/>
            } */}
      </div>
    );
  }
}
export class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  logo() {
    // if(this.props.nomeUser !='Cliente')return "/img/iconUser.png"
    let nome = this.props.nomeUser.split(" ");
    return (
      nome[0].charAt(0).toUpperCase() +
      "" +
      (nome[1] ? nome[1].charAt(0).toUpperCase() : "")
    );
    // return (this.props.aluno.nome.split(" ")[0]+" "+(sobrnome?sobrnome.charAt(0).toUpperCase():'')).substring(0, 8);
  }
  render() {
    let { item } = this.props;
    return (
      <div className="content_index_view4_2">
        <Hidden smUp>
          <div
            className={
              "content_index_view3Phone " +
              (item.position == "left"
                ? "content_index_view3Phone_left"
                : "content_index_view3Phone_else")
            }
            style={item.digitando ? {minHeight: 15,minWidth: 15} : null}
          >
            {((this.props.nomeUser == "" || item.position == "left") && (
              <Image
                className="content_index_imagePhone"
                height={item.digitando ? 8.75 : 20}
                width={item.digitando ? 6.88 : 20}
                style={item.digitando ? { margin: [3.75,4.06,2.5,4.06] } : { marginTop: 3 }}
                source={item.position == "left" ? iconWolff : iconUser}
                resizeMode={"contain"}
              />
            )) || (
              <TextView className="content_index_textPhoneLogo">
                {this.logo()}
              </TextView>
            )}
          </div>
        </Hidden>
        <Hidden xsDown>
          <div
            className={
              "view content_index_view3 " +
              (item.position == "left"
                ? "content_index_view3Phone_left"
                : "content_index_view3Phone_else")
            }
            style={item.digitando ? {minHeight: 15,minWidth: 15} : null}
          >
            {((this.props.nomeUser == "" || item.position == "left") && (
              <Image
                className="content_index_imagePhone"
                style={item.digitando ? { margin: [3.75,4.06,2.5,4.06] } : { marginTop: 3 }}
                height={item.digitando ? 8.75 : 25}
                width={item.digitando ? 6.88 : 25}
                source={item.position == "left" ? iconWolff : iconUser}
                resizeMode={"contain"}
              />
            )) || (
              <TextView className="content_index_textLogo">
                {this.logo()}
              </TextView>
            )}
          </div>
        </Hidden>
      </div>
    );
  }
}

class InfoMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { item } = this.props;
    // if(item.position!='left')console.log(item);
    // let background=item.position=='left'?"linear-gradient(140deg,#64A73F,#AFC700)":'#666'
    return (
      <div
        className={
          "view " +
          (item.position == "left"
            ? "content_index_view4"
            : "content_index_view4_right")
        }
      >
        <Hidden smUp>
          <div
            className={
              "view content_index_view6Phone" +
              (item.position == "left" ? "" : "content_index_view6Phone_right")
            }
          >
            <TextView className="content_index_textPhone">
              {(item.position == "left"
                ? window.chat.bot_name
                : this.props.nomeUser) +
                (window.chat.bot_name && item.position == "left" ? " - " : "") +
                (this.props.nomeUser && item.position == "right" ? " - " : "") +
                moment(item.timestamp).format("hh:mm")}
            </TextView>
            {item.position != "left" &&
              item.id != "agaurdando" &&
              item.respondido && (
                <View
                  className={
                    "content_index_status " +
                    (item.enviado && item.respondido
                      ? "content_index_status_back_true"
                      : "content_index_status_back_false")
                  }
                />
              )}
            {item.position != "left" &&
              item.id == "agaurdando" && (
                <View
                  className={
                    "content_index_status " + "content_index_status_back_false"
                  }
                />
              )}
            {item.position != "left" &&
              item.id != "agaurdando" &&
              !item.respondido && (
                <View
                  className={
                    "content_index_status " +
                    (item.enviado && !item.respondido
                      ? "content_index_status_back_true"
                      : "content_index_status_back_false")
                  }
                />
              )}
            {item.position != "left" &&
              item.id != "agaurdando" && (
                <View
                  className={
                    "content_index_status " +
                    (item.enviado && item.respondido
                      ? "content_index_status_back_true"
                      : "content_index_status_back_false")
                  }
                />
              )}
          </div>
        </Hidden>
        <Hidden xsDown>
          <div
            className={
              "view content_index_view6 " +
              (item.position == "left"
                ? "content_index_view6_left"
                : "content_index_view6_right")
            }
          >
            <TextView
              style={{ fontFamily: "Montserrat" }}
              className="content_index_text"
            >
              {(item.position == "left"
                ? window.chat.bot_name
                : this.props.nomeUser) +
                (window.chat.bot_name && item.position == "left" ? " - " : "") +
                (this.props.nomeUser && item.position == "right" ? " - " : "") +
                moment(item.timestamp).format("hh:mm")}
            </TextView>
            {
              (() => {
                if(item.position != "left"){
                  return (<View
                      className={
                        "content_index_status_cel " +
                        (item.status != "enviado"
                          ? "content_index_status_back_true"
                          : "content_index_status_back_false")
                      }
                    />)
                }
              })()
            }
            {
              (() => {
                if(item.position != "left" && item.status != "enviado") {
                  return (<View
                    className={
                      "content_index_status_cel " +
                      (item.status == "respondido"
                        ? "content_index_status_back_true"
                        : "content_index_status_back_false")
                    }
                  />)
              }
              })()
            }
            {/*item.position != "left" &&
              item.id != "agaurdando" &&
              item.respondido && (
                <View
                  className={
                    "content_index_status_cel " +
                    (item.enviado && item.respondido
                      ? "content_index_status_back_true"
                      : "content_index_status_back_false")
                  }
                />
              )*/}
            {/*item.position != "left" &&
              item.id == "agaurdando" && (
                <View
                  className={
                    "content_index_status_cel " +
                    "content_index_status_back_false"
                  }
                />
              )*/}
            {/*item.position != "left" &&
              item.id != "agaurdando" &&
              !item.respondido && (
                <View
                  className={
                    "content_index_status_cel " +
                    (item.enviado && !item.respondido
                      ? "content_index_status_back_true"
                      : "content_index_status_back_false")
                  }
                />
              )*/}
            {/*item.position != "left" &&
              item.id != "agaurdando" && (
                <View
                  className={
                    "content_index_status_cel " +
                    (item.enviado && item.respondido
                      ? "content_index_status_back_true"
                      : "content_index_status_back_false")
                  }
                />
              )*/}
          </div>
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
    let label = window.chat.bot_name + " está digitando...";
    return (
      //  <View style={styles.view4}>
      <div className="view content_index_view4_2">
        <Hidden smUp>
          <div className="content_index_view7Phone_align">
            <div className="content_index_positionDigitado">
              <Avatar item={{ position: "left" }} nomeUser="" />
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
          <Avatar item={{ position: "left" }} nomeUser="" />
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

          <div className="view content_index_view6" />
        </Hidden>
      </div>
    );
  }
}
