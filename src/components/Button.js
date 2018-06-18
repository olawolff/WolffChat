import React from 'react';

export default class Button extends React.Component {
    
    render() {
      const item = this.props.item;
      return (
        <div key={item.value} className="btn-chat"><span className="button-content">{item.title}</span></div>
      );
    }
  }