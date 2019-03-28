import React from 'react';
import './Chat.scss'

export default class MessageForm extends React.Component {

    constructor(props) {
      super(props);
      this.state = {text: ''};
  
      this.submit = this.submit.bind(this);
      this.change = this.change.bind(this);
    }
  
    submit(e) {
      e.preventDefault();
  
      if(this.state.text != '') {
        var message = {
          type : 'message',
          text : this.state.text,
          time : 0, // Set by the server
          user : 0, // Set before sending
          currentuser: true
        }
        this.props.onMessageSubmit(message);  
        this.setState({ text: '' });
      }
    }
  
    change(e) {
      this.setState({ text : e.target.value });
    }
  
    render() {
  
      return (
        <form onSubmit={this.submit} className="form" >
          <input autoFocus onChange={this.change} value={this.state.text} className="input" placeholder="Type a message"/>
          <input type="submit" value="Send" className="button" />
        </form>
      );
    }
  }