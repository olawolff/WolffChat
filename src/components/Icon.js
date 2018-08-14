import React from "react";

class Icon extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      hover: props.hover,
      icon: props.icon
    };
    if (props.name) {
      this.state.icon = props.name;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props) {
      nextState.icon = nextProps.icon;
      if (nextProps.name) {
        nextState.icon = nextProps.name;
      }
    }
    return true;
  }

  render() {
    var style = {
      fontSize: 25
    }; //,flex:"1 1 auto" ,flexWrap: "wrap"
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

    if (this.state.hover) {
      var tags = Object.keys(this.state.hover);
      for (var i = 0; i < tags.length; i++) {
        style[tags[i]] = this.state.hover[tags[i]];
      }
    }
    
    if (this.props.fromFontFamily == "Material Design Icons") {
      return <i style={style} className={"mdi mdi-" + this.state.icon} onClick={e => {
            if(this.props.onClick){
              this.props.onClick(e);
            }
          }} />;
    }
 
    return (
      <i  onClick={e => {
            if(this.props.onClick){
              this.props.onClick(e);
            }
          }} style={style} className="material-icons">
        {this.state.icon}
      </i>
    );
 
  }
}

export default Icon;
