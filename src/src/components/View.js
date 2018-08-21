import React from 'react';
import Grid from '@material-ui/core/Grid';

export default class View extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state ={hover:null};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps !==this.props){
    }
    return true;
  }


  render() {

    var style = { display:"flex",boxSizing: "border-box",width:"100%",flex: "0 1 auto"};//,flex:"1 1 auto" ,flexWrap: "wrap"
    //,alignSelf: "flex-start"
    if(this.props.style){
      var lista = [];
      if( Array === this.props.style.constructor){
        lista = this.props.style;
      }else{
        lista.push(this.props.style);
      }
      if(this.props.superStyle && typeof this.props.superStyle === "object"){
        lista.push(this.props.superStyle);
      }
      for (var a = 0; a < lista.length; a++) {
        var st = lista[a];
        if(!st){
          continue;
        }
        var tags = Object.keys(st);
        for (var i = 0; i < tags.length; i++) {
          style[tags[i]] = st[tags[i]];
        }
      }
    }

    if(this.state.hover){
      var tags = Object.keys(this.state.hover);
      for (var i = 0; i < tags.length; i++) {
        style[tags[i]] = this.state.hover[tags[i]];
      }
    }

    if((style.alignSelf ==  "stretch" || style.alignSelf ==  "auto")  && style.width=="100%"){
      style.width = "none";
    }
    if(  !style.alignSelf  && !this.props.children && style.width=="100%"){
      style.width = "none";
    }
    if( style.elevation){
      style.boxShadow = "0px 0px "+(parseInt(style.elevation)*2)+"px 0px rgba(0,0,0,0.4)";
    }
    if(this.props.superStyle &&  this.props.superStyle.width ){
      style.width = this.props.superStyle.width;
    }

    let props = {};
    var pr = Object.keys(this.props);
    for (var i = 0; i < pr.length; i++) {
      let prn = pr[i];
      if(prn.indexOf("on") === 0){
        props[prn] = this.props[prn];
      }
    }

    if(this.props.container || this.props.item || this.props.sx || this.props.sm || this.props.nd || this.props.xl || this.props.lg){
        return      <Grid {...this.props} />
        
    }
    return (
      <div id={this.props.id} className={this.props.className}
        {...props}
        onPress={undefined}
        
        onClick={(e)=>{
          if(this.props.onClick){
            this.props.onClick(e);
          }
        }}  style={style}>
        {this.props.clild}
        {this.props.children}
      </div>
    );
  }

}
