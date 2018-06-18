import React, { Component } from 'react';
import './styles/chat.css';
import 'whatwg-fetch';
import DirectLineClient from './DirectLineClient';
import History from './components/History';
//import UserInput from './components/UserInput';
import _ from 'underscore';

class BotClientComponent extends Component {
  constructor() {
    super();

    var self = this;
    this.state = {
      messages: [],
      message: '',
      user: ''
    };

    this.handleChange = this.handleChange.bind(this);

    this.directLineClient = new DirectLineClient(window.chat.bot_secret);
    this.directLineClient.getMessages(function (streamData) {
      var arrayvar = self.state.messages.slice();
      var newActivities = streamData.activities;
      _.each(newActivities, function (newActivity) {
        // find in existing arrayvar, and replace
        var replaced = false;
        if (newActivity.channelData) {
          var existing = _.find(arrayvar, function (a) {
            return a.channelData && a.channelData.localId === newActivity.channelData.localId;
          });
          if (existing) {
            _.extend(existing, newActivity);
            replaced = true;
          }
        }
        // else just add it 
          if (!replaced) {
            arrayvar.push(newActivity);
          }
      });

      var sorted = _.sortBy(arrayvar, 'id');
      self.setState({ messages: sorted });
      //console.log(sorted);
    }); // start streaming
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }
  
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.postMessage();
    }
  }

  postMessage() {
    var self = this;
    var localId = new Date().getTime();
    var activity = { 
      id: localId, 
      type: 'message', 
      text: this.state.message, 
      from: { id: 'james' }, 
      channelData: { localId: localId } };

    var arrayvar = self.state.messages.slice();
    arrayvar.push(activity);
    self.setState({ messages: arrayvar });

    this.directLineClient.postMessage(activity);
    this.setState({
      message: ""
    });
  }

  render() {
    return (
      <div className="chatbot">
        <History messages={this.state.messages}  />
        <div className="input-form">
          <input placeholder="Diga-me qual é a sua dúvida..." id="cow-input" className="input-text" type='text' value={this.state.message} onChange={this.handleChange} onKeyPress={this.handleKeyPress} /><br/>
          <button className="btn-chat send-button" onClick={this.postMessage.bind(this)}>Enviar</button>
        </div>
      </div>
    );
  }
}

export default BotClientComponent;

//Exportar os arquivos para chat.js e chat.css
//o arquivo index.html no direitorio build funcionar mesmo sem estar localhost (npm start)
//Input em um componente separado