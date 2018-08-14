import React from 'react';
import View from './View';


var idiomas = null;
export default  class TextView extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state =  { text :props.text };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps !==this.props){
      nextState.text = nextProps.text;
    }
    return true;
  }


  getStringLimit(text){
    if(! this.props.limit || !text){
      return text;
    }
    var limit = parseInt( this.props.limit);
    if (text && text.length) {
      if (text.length > limit && limit > 0) {
        text = text.substring(0, limit)+"...";
      }
    }
    return text;
  }

  render() {

    var style = {
      flexWrap: "wrap" ,
      flexDirection: "column",
      justifyContent: "center",
      display:"flex",
      width:"none",
      flex: "0 1 auto"
      // flex: "1 auto"
    };
    // console.log(this.props.style);
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
    style.backgroundColor ="none";
    if(style.textAlign =="center"){
      style.alignItems= "center";
    }
    if(style.textAlign =="right"){
      style.alignItems= "flex-end";
    }
    style.lineHeight= 1;
    // if(style.aliginSelf =="stretch"){
    //   style.width= "100%";
    // }
    // var fontSize  = style.fontSize? style.fontSize:13;
    // var splietSize =
    // if(style.marginBottom){
    //
    // }else{
    //
    // }

    if(style.fontFamily==""){
      style.fontFamily= "sans-serif";
    }
    var text ="";//(typeof this.props.children)+"" =="string"?  this.props.children:"";
    // if(this.isObject(this.props.children)){
    //   return (<div />);
    // }else{
    text = this.props.children +"";
    // }
    if(this.state.text || this.state.text+""=="0"){
      text = this.state.text;
    }
    if(this.props.idiomas && idiomas ){
      text =  this.props.idiomas[idiomas] ?   this.props.idiomas[idiomas] :text;
    }

    // console.log(text);
    // console.log(this.props);
    // console.log(style);
    // return (<div />);
    if( text+"" == "0" ){
      text ="0";
    }
    if((!text || text=="" || text=="undefined") && text+"" != "0"){
      // console.log("return textS");
      return (<div />);
    }


    if(this.props.elevation){
      style.textShadow = "0px 0px "+(this.props.elevation)+"px  rgba(0,0,0,0.8)";
    }

    // onClick={(e)=>{
    //   if(this.props.onClick){
    //     this.props.onClick(e);
    //   }
    // }}
    // text=  ApiUteis.replaceAll(text,"\n","</br>");
    text = this.getStringLimit(text);
    var array = (text+"").split("\n");
    var views = [];
    for (var i = 0; i < array.length; i++) {
      var item =   array[i];
      // views.push(<View style={ {
      //   width:"none",
      //   justifyContent:style.justifyContent,
      //   alignItems :style.alignItems
      // }  }>{item}</View>)
      if(i>0){
        views.push(<br key={"bar_"+i} />)
      }
      // views.push(<div key={"span_"+i} >{item}</div>)
      views.push(item);
    }

    delete  style.boxShadow;

    return (
      <View   {...this.props} elevation={null} style={style}>
        {views}
      </View>
    );
  }

  isObject(val) {
    if (!val || val === null) { return false;}
    return ( (typeof val === 'function') || (typeof val === 'object') );
  }
}


TextView.setIdioma = function(tag){
  idiomas =tag;
}
