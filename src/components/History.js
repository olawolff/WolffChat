import React from 'react';
import BotMessage from './BotMessage';
import UserMessage from './UserMessage';

export default class History extends React.Component {

  componentDidUpdate(prevProps, prevState){
    this.scrollToBottom();
  }
  
  scrollToBottom() {
    const {chatHistoryScroll} = this.refs;
    chatHistoryScroll.scrollTop = chatHistoryScroll.scrollHeight - chatHistoryScroll.clientHeight;
  }
  
  render() {
    const messages = this.props.messages;
    console.log("log", messages);

    const listItems = messages.map(function (message) {
      if(message.from.id === window.chat.bot_id){
        var semnomeainda = 0;

        if(messages.length > 1){
          if(messages.slice(-2,-1)[0].from.id === window.chat.bot_id){
            semnomeainda = semnomeainda + 1;
          }
        }
        
        return <BotMessage key={message.id} message={message} showAvatar={semnomeainda}/>
      }else{
        return <UserMessage key={message.id} message={message} />
      }
    });

    return (
      <div className="chatHistory">
        <ul id="test" ref={'chatHistoryScroll'}>{listItems}</ul>
        <div className="clean"></div>
      </div>
    );
  }
}