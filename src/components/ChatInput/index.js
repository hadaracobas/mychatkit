import React from 'react';
import './index.css';

//Emoji Imports
import Chatkit from '@pusher/chatkit-client';
import { Smile } from 'react-feather';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';





class ChatInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            showEmojiPicker: false
        }
    }

    handleOnChangeMessage = (e) => {
        this.setState({
            inputValue: e.target.value
        })

        this.props.currentUser.isTypingIn({
            roomId: this.props.theActiveRoomId
        }).then(() => {
            console.log('Success!')
          });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        this.props.currentUser.sendSimpleMessage({
            roomId: this.props.theActiveRoomId,
            text: this.state.inputValue,
          })

          this.setState({
              inputValue: ''
          });
    }


    toggleEmojiPicker = () => {
        this.setState({
            showEmojiPicker: !this.state.showEmojiPicker
          });
    }

    addEmoji = (emoji) => {
        const addToInputValueTheEmoji = ` ${this.state.inputValue} ${emoji.native}`
        this.setState({
            inputValue: addToInputValueTheEmoji,
            showEmojiPicker: false
          });
    }

    render() {
        
        return(
            <form onSubmit={this.handleSubmit}>
                <div className="input-group input-container">
                    <ul className="chat-messages">{this.state.showEmojiPicker ? (
                  <Picker set="emojione" onSelect={this.addEmoji} />
                ) : null}</ul>
                        <button className="btn btn-outline-secondary" type="button" onClick={this.toggleEmojiPicker}><Smile /></button>
                        <input value={this.state.inputValue} onChange={this.handleOnChangeMessage} type="text" className="form-control input-value-text" placeholder="type your message here" aria-label="Recipient's username with two button addons" aria-describedby="button-addon4"/>
                        <div className="input-group-append" id="button-addon4">
                            <button className="btn btn-outline-secondary" type="button" onClick={this.handleSubmit}>Send</button>
                        </div>
                        
                </div>
               
            </form>
        );
    }
}

export default ChatInput;



