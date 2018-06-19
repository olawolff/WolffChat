import React from 'react';

export default class Button extends React.Component {
  
    sendButtonValue(itemToSend){
      console.log("click", this);
      this.postMessage(itemToSend);
    } 
    
    render() {
      const item = this.props.item;
      return (
        <div key={item.value} onClick={this.sendButtonValue.bind(this, item)} className="btn-chat"><span className="button-content">{item.title}</span></div>
      );
    }
  }