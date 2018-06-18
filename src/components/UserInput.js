import React from 'react';
import BotClientComponent from '../App';

export default class UserInput extends React.Component {
  render() {
    return (
        <div>
            <input value="animador" type='text' value={BotClientComponent.arguments.state.message} onChange={this.handleChange} />
            <button onClick="this.postMessage.bind(this)">Enviar mensagem</button>
        </div>
    );
  }
}