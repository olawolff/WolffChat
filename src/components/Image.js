import React from 'react';

export default  class Image extends React.Component {


  constructor(props, context) {
    super(props, context);

    // console.log(props);
    this.state = {
      src: props.src ? props.src : "",
      resizeMode: props.resizeMode,
      style: props.style,
      width: props.width,
      height: props.height,
      minWidth : props.minWidth
    };


    this.upDateMode(props);


    if (props.source && props.source.uri) {
      this.state.src = props.source.uri;
    }
    if (props.source && (typeof props.source) + "" == "string") {
      this.state.src = props.source;
    }
    // console.log(props.source);
    // PropTypes.oneOf(['cover', 'contain', 'stretch', 'repeat', 'center'])
  }
  upDateMode(props) {
    if (props.resizeMode === "center" || props.resizeMode === "cover") {
      this.state.backgroundSize = "cover";
    } else if (props.resizeMode === "fit" || props.resizeMode === "contain") {
      this.state.backgroundSize = "contain";
    } else if (props.resizeMode === "fill") {
      this.state.backgroundSize = "cover";
    } else if (props.resizeMode === "matriz" || props.resizeMode === "stretch") {
      this.state.backgroundSize = "100% 100%";

    } else if (props.resizeMode === "stretch") {
      this.state.backgroundSize = "100% 100%";
    } else if (props.resizeMode === "contain") {
      this.state.backgroundSize = "contain";
    } else {
      this.state.backgroundSize = "cover";
    }

  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props) {
      nextState.src = nextProps.src;
      nextState.style = nextProps.style;
      if (nextProps.source && nextProps.source.uri) {
        nextState.src = nextProps.source.uri;
      }
      if (nextProps.source && (typeof nextProps.source) + "" == "string") {
        nextState.src = nextProps.source;
      }
      this.state = nextState;
      this.upDateMode(nextProps);

    }
    return true;
  }



  render() {


    // var style={};
    // if(this.state.style){
    //   style = this.state.style;
    // }

    var style = {
      alignContent: "center",
      minHeight: 5,
      minWidth: this.state.minWidth ? this.state.minWidth : 5,
      width: this.state.width,
      height: this.state.height,
      display: "flex",
      boxSizing: "border-box",
      flex: "0 1 auto",

      backgroundSize: this.state.backgroundSize,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "50% 50%"
    };

    var url = this.state.src;

    if (this.state.src) {
      style.backgroundImage = "url('" + url + "')";
    }
    // console.log(url);
    // console.log(this.props);
    // console.log(this.state);
    // console.log(style);

    // if(this.state.style){
    //   var lista = Object.keys(this.state.style);
    //   for (var i = 0; i < lista.length; i++) {
    //     style[lista[i]] = this.state.style[lista[i]];
    //   }
    // }
    if (this.props.style) {
      var lista = [];
      if (Array === this.props.style.constructor) {
        lista = this.props.style;
      } else {
        lista.push(this.props.style);
      }
      if (this.props.superStyle && typeof this.props.superStyle === "object") {
        lista.push(this.props.superStyle);
      }
      for (var a = 0; a < lista.length; a++) {
        var st = lista[a];
        if (!st) {
          continue;
        }
        var tags = Object.keys(st);
        for (var i = 0; i < tags.length; i++) {
          style[tags[i]] = st[tags[i]];
        }
      }
    }
    // console.log(this.props.style);
    // console.log(style);
    return ( < div onMouseEnter = {
        (e) => {
          if (this.props.hover) {
            this.setState({
              hover: this.props.hover
            })
          }
          if (this.props.onMouseEnter) {
            this.props.onMouseEnter(e);
          }
        }
      }

      onMouseLeave = {
        (e) => {
          if (this.props.hover) {
            this.setState({
              hover: {}
            })
          }
          if (this.props.onMouseLeave) {
            this.props.onMouseLeave(e);
          }
        }
      }


      onClick = {
        (e) => {
          if (this.props.onClick) {
            this.props.onClick(e);
          }
          if (this.props.onPress) {
            this.props.onPress(e);
          }
        }
      }
      style = {
        style
      } > {
        this.props.children
      } </div>
    );
  }

}

Image.resizeMode = {
  cover: "center",
  contain: "fit",
  stretch: "matriz",
  repeat: "repeat",
  center: "fill"
};

 
