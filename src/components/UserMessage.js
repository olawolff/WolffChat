import React from 'react';

export default class UserMessage extends React.Component {
  render() {
    const message = this.props.message;
    var date = new Date();
    var output = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
    
    return (
      <li className="message-container">
        <div className="message-user">
          <div className="avatar">
          </div>
          <div className="message-content-container message-content">
            {message.text}
          </div>
          <div className="clean"></div>
          <div className="message-info">
            {window.chat.bot_name} - {output}
          </div>
        </div>
        <div className="clean"></div>
      </li>
    );
  }
}