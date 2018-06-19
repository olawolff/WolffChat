import React from 'react';
import Button from './Button';
import botIcon from '../images/_icon-Wolff.png';

export default class BotMessage extends React.Component {

  getText(message, postMessage){
    if(!message.text){
      var attachment = message.attachments[0]

      switch(message.attachmentLayout){
        case "list":
          return  <div className="message-content-container">
                    <div className="message-content">
                      {attachment.content.text}
                    </div>
                    <div className="message-content-buttons">
                      {this.getButtons(attachment.content, postMessage)}
                    </div>
                  </div>;
        default:
          break;
      }
    }
    else{

      return  <div className="message-content-container message-content">
                {message.text}
              </div>;
    }
  }

  getButtons(attachment, postMessage){
    var x = attachment.buttons.map(element => 
      <Button item={element} postMessage={postMessage}/>
    );

    return x;
  }

  hasAvatar(showAvatar){
    showAvatar = true; //temp variable
    if (!showAvatar) {
      return "";
    }
  
    return (
      <div className="avatar">
        <img alt="Avatar do chatbot" src={botIcon} />
      </div>
    )  
  }
  
  render() {
    const message = this.props.message;
    var showAvatar = this.props.showAvatar;
    var date = new Date(message.timestamp);
    var output = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);

    return (
      <li className="message-container">
        <div className="message-bot">
          {this.hasAvatar(showAvatar)}
          {this.getText(message, this.props.postMessage)}

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